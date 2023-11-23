import { gql, useMutation } from "@apollo/client";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  ThemeProvider,
  Typography,
  useTheme,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import getGraphQLClient from "./api";
import theme from "./theme";

const SubmitButton = ({
  loading,
  formik,
}: {
  loading: boolean;
  formik: any;
}) => {
  const theme = useTheme();

  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: "white", // Text color
        "&:hover": {
          backgroundColor: "#33335b",
        },
      }}
      // disabled={loading || formik.isSubmitting}
    >
      Submit
    </Button>
  );
};

const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().required("Email is required").email("Invalid email"),
  countryCode: yup.string().required("Country Code is required"),
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .matches(/^\d{6,14}$/, "Invalid phone number format"),
  timeZone: yup.string().required("Time Zone is required"),
});

const CREATE_USER = gql`
  mutation authoring_createUser($input: authoring_userInputRequest) {
    authoring_createUser(input: $input) {
      message
    }
  }
`;
export type UserRegistrationProps = {
  onSubmit: (error: any, response: any) => void;
};

const UserRegistration: React.FC<UserRegistrationProps> = ({ onSubmit }) => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER, {
    client: getGraphQLClient(),
    onCompleted: (data: any) => {
      console.log("User created:", data.authoring_createUser.message);
      onSubmit(null, data);
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      onSubmit(error, null);
    },
  });
  const handleSubmit = async (formData: any) => {
    try {
      createUser({
        variables: {
          input: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phoneNumber,
            role_id: "",
            role: "admin",
            image: "",
            timezone: formData.timeZone,
          },
        },
      });
    } catch (error: any) {
      console.error("Mutation Error:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "",
      phoneNumber: "",
      timeZone: "",
    },
    validationSchema: schema,
    onSubmit: async (values: any) => {
      handleSubmit(values);
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="md"
        sx={{
          marginTop: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Box
              border="1px solid #e0e0e0"
              width={"100%"}
              mb={5}
              borderRadius="4px">
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#f3faff",
                }}>
                <Typography
                  component="h4"
                  variant="h6"
                  ml={4}
                  textAlign={"left"}>
                  User’s Details
                </Typography>
                <Typography
                  component={"p"}
                  ml={4}
                  variant="body1"
                  textAlign={"left"}
                  sx={{ color: "#89909a", whiteSpace: "pre-wrap" }}>
                  Fields with * are mandatory
                </Typography>
              </Box>
              <Box padding={4}>
                <Grid
                  container
                  rowSpacing={5}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ width: "100%" }}>
                  <Grid
                    item
                    md={5}
                    sx={{
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}>
                    <Typography variant="h6" sx={{ color: "#000000de" }}>
                      First Name*
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="body1"
                      sx={{ color: "#89909a" }}>
                      This will be your First Name
                    </Typography>
                  </Grid>
                  <Grid item md={7}>
                    <TextField
                      fullWidth
                      required
                      size="small"
                      variant="outlined"
                      name="firstName"
                      placeholder="First Name"
                      error={
                        formik.touched.firstName &&
                        Boolean(formik.errors.firstName)
                      }
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.firstName &&
                        (formik.errors.firstName as React.ReactNode)
                      }
                    />
                  </Grid>

                  {/* Last Name Field */}
                  <Grid
                    item
                    md={5}
                    sx={{
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}>
                    <Typography variant="h6" sx={{ color: "#000000de" }}>
                      Last Name*
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="body1"
                      sx={{ color: "#89909a" }}>
                      This will be your Last Name
                    </Typography>
                  </Grid>
                  <Grid item md={7}>
                    <TextField
                      fullWidth
                      required
                      size="small"
                      variant="outlined"
                      name="lastName"
                      placeholder="Last Name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.lastName &&
                        (formik.errors.lastName as React.ReactNode)
                      }
                      error={
                        formik.touched.lastName &&
                        Boolean(formik.errors.lastName)
                      }
                    />
                  </Grid>

                  {/* Email Field */}
                  <Grid
                    item
                    md={5}
                    sx={{
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}>
                    <Typography variant="h6" sx={{ color: "#000000de" }}>
                      Email*
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="body1"
                      sx={{ color: "#89909a" }}>
                      This will be your Email
                    </Typography>
                  </Grid>
                  <Grid item md={7}>
                    <TextField
                      fullWidth
                      required
                      placeholder="Email"
                      size="small"
                      variant="outlined"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.email &&
                        (formik.errors.email as React.ReactNode)
                      }
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    md={5}
                    sx={{
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}>
                    <Typography variant="h6" sx={{ color: "#000000de" }}>
                      Phone*
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="body1"
                      sx={{ color: "#89909a" }}>
                      This will be your Phone
                    </Typography>
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      fullWidth
                      required
                      size="small"
                      variant="outlined"
                      name="countryCode"
                      placeholder="Phone"
                      value={formik.values.countryCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.countryCode &&
                        (formik.errors.countryCode as React.ReactNode)
                      }
                      error={
                        formik.touched.countryCode &&
                        Boolean(formik.errors.countryCode)
                      }
                    />
                  </Grid>
                  <Grid item md={4}>
                    <TextField
                      fullWidth
                      required
                      size="small"
                      variant="outlined"
                      name="phoneNumber"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.phoneNumber &&
                        (formik.errors.phoneNumber as React.ReactNode)
                      }
                      error={
                        formik.touched.phoneNumber &&
                        Boolean(formik.errors.phoneNumber)
                      }
                    />
                  </Grid>
                  <Grid
                    item
                    md={5}
                    sx={{
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}>
                    <Typography variant="h6" sx={{ color: "#000000de" }}>
                      Time Zone*
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="body1"
                      sx={{ color: "#89909a" }}>
                      Please select user’s time zone
                    </Typography>
                  </Grid>
                  <Grid item md={7}>
                    <TextField
                      fullWidth
                      required
                      size="small"
                      variant="outlined"
                      name="timeZone"
                      placeholder="Time Zone"
                      value={formik.values.timeZone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      helperText={
                        formik.touched.timeZone &&
                        (formik.errors.timeZone as React.ReactNode)
                      }
                      error={
                        formik.touched.timeZone &&
                        Boolean(formik.errors.timeZone)
                      }
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box border="1px solid #e0e0e0" width={"100%"} borderRadius="4px">
              <Box
                sx={{
                  width: "100%",
                  backgroundColor: "#f3faff",
                }}>
                <Typography
                  ml={4}
                  component="h4"
                  variant="h6"
                  textAlign={"left"}>
                  Role & Permissions
                </Typography>
                <Typography
                  ml={4}
                  component={"p"}
                  variant="body1"
                  textAlign={"left"}
                  sx={{ color: "#89909a", whiteSpace: "pre-wrap" }}>
                  Fields with * are mandatory
                </Typography>
              </Box>
              <Box padding={4}>
                <Grid
                  container
                  rowSpacing={5}
                  columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  sx={{ width: "100%" }}>
                  <Grid
                    item
                    md={5}
                    sx={{
                      textAlign: "left",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}>
                    <Typography variant="h6" sx={{ color: "#000000de" }}>
                      Role*
                    </Typography>
                    <Typography
                      component={"p"}
                      variant="body1"
                      sx={{ color: "#89909a" }}>
                      Choose User’s Role
                    </Typography>
                  </Grid>
                  <Grid item md={7}>
                    <RadioGroup
                      defaultValue="female"
                      name="radio-buttons-group">
                      <FormControlLabel
                        value="viewer"
                        control={<Radio />}
                        label="Viewer"
                      />
                      <Typography
                        component={"p"}
                        variant="body1"
                        textAlign={"left"}
                        sx={{ color: "#89909a" }}>
                        Choose User’s Role
                      </Typography>
                      <FormControlLabel
                        value="author"
                        control={<Radio />}
                        label="Author"
                      />
                      <Typography
                        component={"p"}
                        variant="body1"
                        textAlign={"left"}
                        sx={{ color: "#89909a" }}>
                        Choose User’s Role
                      </Typography>
                      <FormControlLabel
                        value="admin"
                        control={<Radio />}
                        label="Admin"
                      />
                      <Typography
                        component={"p"}
                        variant="body1"
                        textAlign={"left"}
                        sx={{ color: "#89909a" }}>
                        Has access to everything in the site such as site
                        configurations, layouts, templates, taxonomies, content
                        types, scripts, etc. in addition to the publisher role
                      </Typography>
                      <FormControlLabel
                        value="cntMgr"
                        control={<Radio />}
                        label="Content Manager"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <SubmitButton loading={loading} formik={formik} />
                    {error && (
                      <Typography variant="body2" color="error">
                        {error.message}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default UserRegistration;
