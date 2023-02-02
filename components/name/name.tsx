import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { goBackAtom } from "@/src/atoms/goBack";
import { userAtom } from "@/src/atoms/user-atom";

const NameChanger: React.FC = () => {
  const [user, setUser] = useRecoilState(userAtom);
  const [goBackUrl, setGoBack] = useRecoilState(goBackAtom);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    mode: "onChange",
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  const onSubmit = (data: { name: string }) => {
    setUser((current) => ({ ...current, name: data.name }));

    if (goBackUrl) {
      router.push(goBackUrl);
      setGoBack(null);
      return;
    }

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
            error={!!errors.name?.message}
            helperText={errors.name?.message ?? null}
            {...register("name", {
              required: true,
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
              validate: (value) => !!value && value.length > 2,
            })}
          />
          <Button
            variant="contained"
            disabled={!!errors.name?.message}
            type="submit"
          >
            Save
          </Button>
        </Card>
      </Box>
    </form>
  );
};

export default NameChanger;
