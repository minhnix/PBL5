import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LineChart from "../../components/shared/LineChart";

const ViewStatistic = () => {
  const { id } = useParams();
  const [chartData, setChartData] = useState();
  const [label, setLabel] = useState([]);
  const [owner, setOwner] = useState({});
  const [option, setOptions] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:3000/api/history/owners/${id}`).then((res) => {
      // console.log(response.data.data.history[0]);
      //   console.log(res);
      setOptions({
        scales: {
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Count",
            },
          },
        },
      });
      let store = [
        ...new Set(
          res.data.data.history?.map((data) => data.createdAt.slice(0, 10))
        ),
      ];
      let inArray = new Array(store.length).fill(0);
      let outArray = new Array(store.length).fill(0);
      let index = 0;
      for (let i = 0; i < res.data.data.history.length; i++) {
        if (
          i != 0 &&
          res.data.data.history[i].createdAt.slice(0, 10) !=
            res.data.data.history[i - 1]?.createdAt.slice(0, 10)
        ) {
          index++;
        }
        if (res.data.data.history[i].type == "in") {
          inArray[index]++;
        } else {
          outArray[index]++;
        }
        console.log(inArray, outArray);
      }
      setChartData({
        labels: [
          ...new Set(
            res.data.data.history?.map((data) => data.createdAt.slice(0, 10))
          ),
        ],
        datasets: [
          {
            label: "In",
            data: inArray,
            backgroundColor: ["green"],
            borderColor: "green",
            borderWidth: 2,
          },
          {
            label: "Out",
            data: outArray,
            backgroundColor: ["red"],
            borderColor: "red",
            borderWidth: 2,
          },
        ],
      });
    });
    axios.get(`http://localhost:3000/api/owners/${id}`).then((res) => {
      console.log(res.data.data.owner[0]);
      setOwner(res.data.data.owner[0]);
      //   console.log(res);
    });
  }, []);
  return (
    <div className="w-full flex flex-col items-center justify-center font-sans overflow-hidden">
      <h1 className="mb-4">Thống kê ra vào của user {owner?.name} </h1>
      <div className="w-[90%] ">
        {chartData && <LineChart chartData={chartData} options={option} />}
      </div>
    </div>
  );
};

export default ViewStatistic;
