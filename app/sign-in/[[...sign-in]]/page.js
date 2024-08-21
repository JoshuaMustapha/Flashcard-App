import {Container, AppBar, Toolbar, Typography, Button, Box} from '@mui/material'
import {SignIn, SignUp} from '@clerk/nextjs'
import Link from 'next/link'
import Head from 'next/head';

export default function SignUpPage() {
    return (
        <Container maxWidth="sm">
            <AppBar position="static" sx={{backgroundColor: '#3f51b5'}}>
                <Toolbar>
                    <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1.
                    }}
                    >
                        Flascard App
                    </Typography>
                    <Button color="inherit">
                        <Link href="/login" passHref>
                        Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/login" passHref>
                        Sign Up
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center">
            </Box>
            <Typography variant="h4">Sign In</Typography>
            <SignIn />
        </Container>
    )
}