import React, { useState, useEffect } from "react";
import {
  IonButton,
  IonCard,
  IonCardHeader,
} from "@ionic/react";
import SelingChart from "./SelingChart";
import { getDataApi } from "../../api/getData";
import { TokenContext } from "../../pages/Home";

interface GraphForSellingProps {
  storeID: number | null;
}

const GraphForSelling: React.FC<GraphForSellingProps> = ({ storeID }) => {
  const tokenContext = React.useContext(TokenContext);
  const token = tokenContext.token;
  const [dataForDays, setDataForDays] = useState<number[]>([]);
  const [dataForWeeks, setDataForWeeks] = useState<number[]>([]);
  const [dataForMonths, setDataForMonths] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState('Days'); // Default to 'Days'


  useEffect(() => {
    const fetchDataForSelectedStore = async (
      storeID: number | null,
      since: string,
      timeUnit: string
    ) => {
      try {
        // Call the getDataApi function with the selected store's ID and the provided time parameters
        const data = await getDataApi(
          token,
          since,
          new Date().toISOString(),
          timeUnit,
          storeID
        );
        return data;
    } catch (error: any) {
        console.error("Error fetching data for the selected store:", error);
        if (error.message === "Request failed with status 401") {
            console.log("token expired");
            tokenContext.setToken(null);
        }
    }
    };
   

    const calcultaeTheProfit = (data: any) => {
      let profit = 0;
      data.forEach((element: any) => {
        profit += element.totalRevenue;
      });
      return profit;
    };

    // Compare the profit between the last week and the current week
    const compareProfitBeetwenDays = async () => {
      let data = await fetchDataForSelectedStore(
        storeID,
        new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        "days"
      );
      if (Array.isArray(data)) {
        let day1 = calcultaeTheProfit([data[0]]);
        let day2 = calcultaeTheProfit([data[7]]);
        
        return [day1, day2];
      } else {
        return [0, 0];
      }
    };

    // Compare the profit between the last week and the current week
    const compareProfitBeetwenWeeks = async () => {
      let data = await fetchDataForSelectedStore(
        storeID,
        new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        "days"
      );
      if (Array.isArray(data)) {
        // Calculate the start and end dates for the last week and the current week
        const currentDate = new Date(); // Current date
        const dayOfWeek = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
        const firstDayOfThisWeek = new Date(new Date(currentDate).setDate(currentDate.getDate() - dayOfWeek));
        const firstDayOfLastWeek = new Date(new Date(currentDate).setDate(currentDate.getDate() - dayOfWeek - 8));
        const lastWeekEnd = new Date(new Date(currentDate).setDate(currentDate.getDate() - 7));

        const filteredData = data.filter((item) => {
          const itemDate = new Date(item.startTime);
          return itemDate >= firstDayOfLastWeek && itemDate <= lastWeekEnd;
        });

        // Calculate the total profit for the last week
        const lastWeekProfit = filteredData.reduce(
          (total, item) => total + item.totalRevenue,
          0
        );

        // Calculate the total profit for the current week
        const currentWeekProfit = data
          .filter((item) => new Date(item.startTime) >= firstDayOfThisWeek)
          .reduce((total, item) => total + item.totalRevenue, 0);

        // Return an array with the profits of the last week and the current week
        return [lastWeekProfit, currentWeekProfit];
      } else {
        return [0, 0];
      }
    };
      

    // Compare the profit between the current month and the previous month
    const compareProfitBeetwenMonths = async () => {
      let data = await fetchDataForSelectedStore(
        storeID,
        new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
        "days"
      );
      if (Array.isArray(data)) {
        // Calculate the start and end dates for the current month and the previous month
        const currentDate = new Date(); // Current date
        const currentMonthStartDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        const previousMonthEndDate = new Date(currentMonthStartDate);
        previousMonthEndDate.setDate(currentMonthStartDate.getDate() - 1);
        currentMonthStartDate.setDate(1);

        // Filter the data for the current month and the previous month
        const filteredData = data.filter((item) => {
          const itemDate = new Date(item.startTime);
          return itemDate >= previousMonthEndDate && itemDate <= currentDate;
        });

        // Calculate the total profit for the previous month
        const previousMonthProfit = filteredData.reduce(
          (total, item) => total + item.totalRevenue,
          0
        );

        // Filter the data for the current month
        const filteredDataCurrentMonth = data.filter((item) => {
          const itemDate = new Date(item.startTime);
          return itemDate >= currentMonthStartDate && itemDate <= currentDate;
        });

        // Calculate the total profit for the current month
        const currentMonthProfit = filteredDataCurrentMonth.reduce(
          (total, item) => total + item.totalRevenue,
          0
        );

        // Return an array with the profits of the current month and the previous month
        return [previousMonthProfit, currentMonthProfit];
      } else {
        return [0, 0];
      }
    };

    async function fetchData() {
      // Fetch data for days, weeks, and months
      const [daysData, weeksData, monthsData] = await Promise.all([
        compareProfitBeetwenDays(),
        compareProfitBeetwenWeeks(),
        compareProfitBeetwenMonths(),
      ]);

      // Update the state with the fetched data
      setDataForDays(daysData);
      setDataForWeeks(weeksData);
      setDataForMonths(monthsData);
    }

    fetchData();
  }, [storeID, token]);

  const handleOptionChange = (option : string) => {
    setSelectedOption(option);
  };

  return (
    <IonCard>
    <IonCardHeader>
      {selectedOption === 'Days' && (
        <SelingChart labels={["היום בשבוע שעבר","היום"]} data={dataForDays} />
      )}
      {selectedOption === 'Weeks' && (
        <SelingChart labels={["שבוע שעבר","שבוע נוכחי"]} data={dataForWeeks} />
      )}
      {selectedOption === 'Month' && (
        <SelingChart labels={["חודש שעבר", "חודש נוכחי"]} data={dataForMonths} />
      )}
    </IonCardHeader>
    <IonButton fill="clear" onClick={() => handleOptionChange('Days')}>יום</IonButton>
    <IonButton fill="clear" onClick={() => handleOptionChange('Weeks')}>שבוע</IonButton>
    <IonButton fill="clear" onClick={() => handleOptionChange('Month')}>חודש</IonButton>
  </IonCard>
  );
};

export default GraphForSelling;
