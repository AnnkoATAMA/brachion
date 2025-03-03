import {Box, Container, Typography} from "@mui/material";

const HomePage = () => {
    return (
        <Container>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <Typography>
                    hello
                </Typography>
            </Box>
        </Container>
    )
}
export default HomePage;