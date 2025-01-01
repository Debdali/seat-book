import { Button, Flex, Input, Text, VStack, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import Seat from "./Seat";
import axios from "axios";
import {
  INVALID_SEATS_ERROR_MESSAGE,
  MAX_SEATS_ERROR_MESSAGE,
  MAX_SEATS_PER_BOOKING,
  MIN_SEATS_ERROR_MESSAGE,
  MIN_SEATS_PER_BOOKING,
  TOAST_DURATION,
  TOAST_POSITION,
} from "../constants/bookingConstants";

export default function SeatSelectionForm({ fetchData, data }) {
  const [numberOfSeat, setNumberOfSeat] = useState();
  const [axiosResponse, setAxiosResponse] = useState();
  const [bookingProcessing, setBookingProcessing] = useState(false);
  const [resetBookingProcessing, setResetBookingProcessing] = useState(false);
  const toast = useToast();

  function displayToast(status, message) {
    toast({
      title: message,
      status: status,
      duration: TOAST_DURATION,
      isClosable: true,
      position: TOAST_POSITION,
      variant: "subtle",
    });
  }

  function handleBookTicket() {
    if (numberOfSeat > MAX_SEATS_PER_BOOKING) {
      displayToast("error", MAX_SEATS_ERROR_MESSAGE);
    } else if (numberOfSeat < MIN_SEATS_PER_BOOKING) {
      displayToast("error", MIN_SEATS_ERROR_MESSAGE);
    } else if (!numberOfSeat || isNaN(numberOfSeat)) {
      displayToast("error", INVALID_SEATS_ERROR_MESSAGE);
    } else {
      handelAxiosPost();
    }
  }

  const handelAxiosPost = async () => {
    setBookingProcessing(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/seats/book`,
        { numOfSeats: numberOfSeat }
      );
      setAxiosResponse(response.data.data);
      fetchData();
      displayToast("success", "Seat successfully booked");
      setBookingProcessing(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      displayToast("error", error.response.data.message);
      setBookingProcessing(false);
    }
  };

  const handleResetBooking = async () => {
    setResetBookingProcessing(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/seats`
      );
      console.log(response.data);
      fetchData();
      setResetBookingProcessing(false);
      setAxiosResponse();
      displayToast("success", "Booking successfully reset.");
    } catch (error) {
      console.error("Error fetching data:", error);
      setResetBookingProcessing(false);
    }
  };

  return (
    <VStack align={"left"}>
      <Flex gap="2" align={"center"}>
        <Text as="b" fontSize={"md"}>
          Book Seats
        </Text>
        {axiosResponse?.map((item) => (
          <Seat key={item._id} isBooked={false} seatNumber={item.seatNumber} />
        ))}
      </Flex>

      <Flex gap="2">
        <Input
          disabled={bookingProcessing || resetBookingProcessing}
          placeholder="Enter number of seats."
          border={"1px solid"}
          onChange={(e) => {
            setNumberOfSeat(parseInt(e.target.value));
          }}
          type="number"
        />
        <Button
          isDisabled={bookingProcessing || resetBookingProcessing || !data}
          w="fit-content"
          px="10"
          colorScheme="green"
          border={"1px solid"}
          onClick={handleBookTicket}
          isLoading={bookingProcessing}
          variant={bookingProcessing ? "outline" : "solid"}
        >
          Book
        </Button>
      </Flex>

      <Button
        isDisabled={bookingProcessing || resetBookingProcessing || !data}
        border={"1px solid"}
        w="full"
        mt="2"
        colorScheme="red"
        onClick={(e) => {
          handleResetBooking();
        }}
        isLoading={resetBookingProcessing}
        loadingText={resetBookingProcessing ? "Please Wait" : ""}
        variant={resetBookingProcessing ? "outline" : "solid"}
      >
        Reset Booking
      </Button>
    </VStack>
  );
}
