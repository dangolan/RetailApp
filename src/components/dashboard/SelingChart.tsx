import { Bar } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import { Chart as ChartJS } from "chart.js/auto";
import {
  IonTitle,
  useIonViewWillEnter,
  useIonViewWillLeave,
} from "@ionic/react";
import React from "react";

// Define the GraphProps interface to specify the expected props
interface GraphProps {
  labels: string[];
  data: number[] | null;
}

const Graph: React.FC<GraphProps> = ({ labels, data }) => {
  useIonViewWillEnter(() => {
    ChartJS.register(CategoryScale);
  }, []);

  useIonViewWillLeave(() => {
    ChartJS.unregister(CategoryScale);
  }, []);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "",
        backgroundColor: ["#F9786D", "#7FF9F7"],
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: data,
      },
    ],
  };

  return (
    <>
      <IonTitle>גרף מכירות</IonTitle>
      <Bar data={chartData} />
    </>
  );
};

export default Graph;
