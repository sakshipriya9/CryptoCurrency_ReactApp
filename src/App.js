import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {
    // Setting up the initial states using
    // react hook 'useState'
    const [search, setSearch] = useState("");
    const [crypto, setCrypto] = useState([]);

    // Fetching crypto data from the CoinGecko API when the component is mounted
    useEffect(() => {
        Axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        ).then((res) => {
            setCrypto(res.data);
        });
    }, []);

    return (
        <div className="App">
            <h1>All Cryptocurrencies</h1>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                    setSearch(e.target.value);
                }}
            />
            <table>
                <thead>
                    <tr>
                        <td>Rank</td>
                        <td>Name</td>
                        <td>Symbol</td>
                        <td>Market Cap</td>
                        <td>Price</td>
                        <td>Available Supply</td>
                        <td>Volume (24hrs)</td>
                    </tr>
                </thead>
                {/* Mapping all the cryptos */}
                <tbody>
                    {/* Filtering to check for the searched crypto */}
                    {crypto
                        .filter((val) => {
                            return val.name.toLowerCase().includes(search.toLowerCase());
                        })
                        .map((val, id) => {
                            return (
                                <tr key={id}>
                                    <td className="rank">{id + 1}</td>
                                    <td className="logo">
                                        <a href={`https://www.coingecko.com/en/coins/${val.id}`}>
                                            <img src={val.image} alt="logo" width="30px" />
                                        </a>
                                        <p>{val.name}</p>
                                    </td>
                                    <td className="symbol">{val.symbol.toUpperCase()}</td>
                                    <td>₹{val.market_cap.toLocaleString()}</td>
                                    <td>₹{val.current_price.toFixed(2)}</td>
                                    <td>{val.circulating_supply?.toLocaleString()}</td>
                                    <td>₹{val.total_volume.toLocaleString()}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
