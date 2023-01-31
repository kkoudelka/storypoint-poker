import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { userNameAtom } from "@/src/atoms/name";
import { useRouter } from "next/router";

const NameChanger: React.FC = () => {
  const [userName, setUserName] = useRecoilState(userNameAtom);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    mode: "onChange",
    defaultValues: {
      name: userName ?? "",
    },
  });

  const onSubmit = (data: { name: string }) => {
    setUserName(data.name);
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={(theme) => ({ mt: theme.spacing(2) })}>
        <Card
          sx={(theme) => ({
            p: theme.spacing(4),
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(4),
            alignItems: "center",
          })}
        >
          <Typography variant="h4" component="h1">
            Enter your name
          </Typography>
          <TextField
            label="Display name"
            variant="outlined"
            fullWidth
            placeholder="Alzák Péter"
            color="primary"
            {...register("name", {
              required: true,
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
              validate: (value) => !!value && value.length > 3,
            })}
          />
          <Button variant="contained" disabled={!!errors.name?.message}>
            Save
          </Button>
        </Card>
      </Box>
    </form>
  );
};

export default NameChanger;
