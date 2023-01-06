import { Container, Stack, Typography } from "@mui/material";

import Calculator from "../../../../components/Calculator"
import { useRouter } from 'next/router'

export default function CurrentCalculator({ }) {
    const router = useRouter();
    const { operation, first, second } = router.query

    const isNumeric = (value) => {
        return /^-?\d+$/.test(value);
    }

    const isValidOperation = (op) => {
        return ["add", "subtract", "multiply", "divide"].indexOf(op) > -1
    }
    let error = false;
    if (!isNumeric(first) || !isNumeric(second) || !isValidOperation(operation)) {
        error = true;
    }



    return (
        <Container maxWidth="sm">
            {!error &&
                <Stack>
                    <Typography variant="h2" gutterBottom sx={{ marginBottom: "30px" }}>
                        The Amazing Calculator
                    </Typography>
                    <Calculator
                        operation={operation}
                        initFirst={first}
                        initSecond={second}
                    />
                </Stack>
            }
            {error && <Stack mt= {20}>
                <Typography variant="h1" align="center" > 404 </Typography>
                <Typography variant="h2" align="center" > Oh no! </Typography>
            </Stack>
            }


        </Container>
    );
}
