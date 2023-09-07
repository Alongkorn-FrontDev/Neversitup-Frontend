import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ValidateSchema = yup.object().shape({
  testOne: yup
    .string()
    .required("Test One is required")
    .matches(/^[0-9]{6}$/, "จะต้องมีความยาวมากกว่าหรือเท่ากับ 6 ตัวอักษร"),
  testTwo: yup
    .string()
    .required("Test Two is required")
    .test(
      "no-consecutive-duplicates",
      "จะต้องไม่ให้มีเลขซ้ำติดกันเกิน 2 ตัว",
      (value) => {
        for (let i = 0; i < value.length - 2; i++) {
          if (
            value[i] === value[i + 1] &&
            value[i] === value[i + 2]
          ) {
            return false;
          }
        }
        return true;
      }
    ),
  testThree: yup
    .string()
    .required("Test Three is required")
    .test(
      "no-consecutive-sequential-numbers",
      "จะต้องไม่ให้มีเลขเรียงกันเกิน 2 ตัว",
      (value) => {
        for (let i = 0; i < value.length - 2; i++) {
          const currentNum = parseInt(value[i]);
          const nextNum = parseInt(value[i + 1]);
          const nextNextNum = parseInt(value[i + 2]);

          if (
            currentNum + 1 === nextNum &&
            nextNum + 1 === nextNextNum
          ) {
            return false;
          }
        }
        return true;
      }
    ),
    testFour: yup
    .string()
    .required("Test Four is required")
    .test(
      "no-consecutive-duplicate-groups",
      "จะต้องไม่ให้มีเลขชุดซ้ำ เกิน 2 ชุด",
      (value) => {
        const groups = value.match(/.{2}/g) || [];
        for (let i = 0; i < groups.length - 2; i++) {
          const currentGroup = groups[i];
          const nextGroup = groups[i + 1];
          const nextNextGroup = groups[i + 2];

          if (
            currentGroup[0] === currentGroup[1] &&
            nextGroup[0] === nextGroup[1] &&
            nextNextGroup[0] === nextNextGroup[1]
          ) {
            return false;
          }
        }
        return true;
      }
    ),
});

export default function PageTest2() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidateSchema),
  });

  const onSubmitHandler = async (value) => {
    // Your form submission logic here
    console.log(value);
    reset();
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography component="h1" variant="h5">
          Test ชุดที่ 2
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmitHandler)}
          noValidate
          sx={{ mt: 1, width: "100%" }}
        >
          <Controller
            name="testOne"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="testOne"
                label="ต้องมีความยาวมากกว่าหรือเท่ากับ 6 ตัวอักษร"
                autoComplete="testOne"
              />
            )}
          />
          {errors.testOne && (
            <div style={{ color: "red", textAlign: "left" }}>
              {errors.testOne.message}
            </div>
          )}
          <Controller
            name="testTwo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="testTwo"
                label="จะต้องกันไม่ให้มีเลขซ้ำติดกันเกิน 2 ตัว"
                autoComplete="testTwo"
              />
            )}
          />
          {errors.testTwo && (
            <div style={{ color: "red", textAlign: "left" }}>
              {errors.testTwo.message}
            </div>
          )}
          <Controller
            name="testThree"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="testThree"
                label="จะต้องกันไม่ให้มีเลขเรียงกันเกิน 2 ตัว"
                autoComplete="testThree"
              />
            )}
          />
          {errors.testThree && (
            <div style={{ color: "red", textAlign: "left" }}>
              {errors.testThree.message}
            </div>
          )}
          <Controller
            name="testFour"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="testFour"
                label="จะต้องกันไม่ให้มีเลขชุดซ้ำ เกิน 2 ชุด"
                autoComplete="testFour"
              />
            )}
          />
          {errors.testFour && (
            <div style={{ color: "red", textAlign: "left" }}>
              {errors.testFour.message}
            </div>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
