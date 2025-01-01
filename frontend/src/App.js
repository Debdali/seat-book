import "./App.css";
import { Flex } from "@chakra-ui/react";
import Compartment from "./components/Compartment";
import SeatSelectionForm from "./components/SeatSelectionForm";
import Header from "./components/Header";
import SignUpLoginForm from "./components/SignUpLoginForm";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch seat data from the server
  const fetchData = async () => {
    setLoading(false);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/seats`
      );
      setLoading(true);
      setData(response.data.availableSeats);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(true);
    }
  };

  return (
    <>
      <Header />
      <SignUpLoginForm />
      <Flex
        justify={"space-evenly"}
        flexDirection={[
          "column-reverse",
          "column-reverse",
          "column-reverse",
          "row",
        ]}
        align={"center"}
        h={"calc(100vh - 100px)"}
        minHeight={"fit-content"}
      >
        <SeatSelectionForm
          fetchData={fetchData}
          setData={setData}
          data={data}
        />
        <Compartment data={data} loading={loading} />
      </Flex>
    </>
  );
}

export default App;
