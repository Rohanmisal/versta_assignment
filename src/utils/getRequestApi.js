import { useEffect, useState } from "react";
import axios from "axios";

const RequestApi = ({ setChartData }) => {
    const [data, setData] = useState([])
    const [apidata, setApiData] = useState([])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://checkinn.co/api/v1/int/requests"
                );
                const deskNames = response.data.requests.map(request => request.desk.name);
                const uniqueNames = Array.from(new Set(deskNames));
                setData(uniqueNames)
                const requests = response.data.requests;
                setApiData(requests)

                const hotels = requests.map((request) => request.hotel.name);
                const uniqueHotels = [...new Set(hotels)];
                const requestCounts = uniqueHotels.map((hotelName) => {
                    return requests.filter((request) => request.hotel.name === hotelName)
                        .length;
                });

                const chartData = {
                    categories: uniqueHotels,
                    series: [
                        {
                            name: "Number of Requests",
                            data: requestCounts,
                        },
                    ],
                };

                setChartData(chartData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [setChartData]);

    return (
        <div>
            <h1>Total Requests: {apidata.length}</h1>
            <h2>Unique Desk Names:{data.length}</h2>
            <ul>
                {data.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RequestApi;
