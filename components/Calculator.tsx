import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  NativeSelect,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import Grid2 from "@mui/material/Unstable_Grid2";
import { OutlinedInput } from "@mui/material";
import axios from "axios";

const Calculator = (): JSX.Element => {
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("");
  const [firstError, setfirstError] = useState("");
  const [secondError, setSecondError] = useState("");
  const [operationError, setOperationError] = useState("");
  const [waitingRes, setWaitingRes] = useState(false);

  // const first = useRef<HTMLInputElement>();
  // const second = useRef<HTMLInputElement>();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log("!!!!!!!")

    setOperation(e.target.value);
    setOperationError("")
  };

  interface MyForm extends EventTarget {
    first: HTMLInputElement;
    second: HTMLInputElement;
  }


  const isNumeric = (value: string) => {
    return /^-?\d+$/.test(value);
  }

  const handleCalculate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const target = e.target as MyForm;
    const query = {
      operation: operation,
      first: target.first.value,
      second: target.second.value,
    };
    let error = false;

    if (!isNumeric(query.first)) {
      setfirstError("Value is not numeric");
      error = true;

    }

    if (!isNumeric(query.second)) {
      setSecondError("Value is not numeric");
      error = true;

    }

    if (!query.operation) {
      setOperationError("Choose the operation");
      error = true;

    }
    if (!error) {
      
      axios
        .get(`/api/calculate/${query.operation}/${query.first}/${query.second}`)

        .then((res) => {
          setResult(res.data.result);
          setWaitingRes(false);
        })
        .catch((err) => {
          setResult(err.response.data.message);
          setWaitingRes(false);
        });
    };

  }




  return (
    <form id="calculator-form" onSubmit={handleCalculate}>
      <Grid2 container spacing={1}>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField id="first" label="First Number" variant="outlined"
              error={!!firstError}
              helperText={firstError || ""}
              onChange={() => { setfirstError("") }}
              required
            />
          </FormControl>
        </Grid2>
        <Grid2 xs={2}>
          <FormControl fullWidth>
            <NativeSelect
              input={<OutlinedInput />}
              defaultValue={""}
              inputProps={{
                name: "operation",
                id: "operation",
              }}
              onChange={handleChange}
              error={!!operationError}            >
              <option value="">Op</option>
              <option value={"add"}>+</option>
              <option value={"subtract"}>-</option>
              <option value={"multiply"}>*</option>
              <option value={"divide"}>/</option>
            </NativeSelect>
            <FormHelperText>{operationError || ""}</FormHelperText>
          </FormControl>
        </Grid2>
        <Grid2 xs={5}>
          <FormControl fullWidth>
            <TextField id="second" label="Second Number" variant="outlined"
              error={!!secondError}
              helperText={secondError || ""}
              onChange={() => { setSecondError("") }}
            />

          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <FormControl fullWidth>

              <Button
                variant="contained"
                type="submit"
  
              >
                Calculate
              </Button>
            

           

          </FormControl>
        </Grid2>
        <Grid2 xs={12}>
          <Divider />
        </Grid2>
        <Grid2 xs={12}>
          <Box>
            <Paper>
              <Typography align="center" variant="h3" gutterBottom id="result">
                {result}
              </Typography>
            </Paper>
          </Box>
        </Grid2>
      </Grid2>
    </form>
  );
};
export default Calculator;

