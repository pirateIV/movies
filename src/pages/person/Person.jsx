import React from "react";
import { useParams } from "react-router-dom";

const Person = () => {
  const { personId } = useParams();
  return <div>Person {personId}</div>;
};

export default Person;
