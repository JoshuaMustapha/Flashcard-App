'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import Head from 'next/head';
import {SignedIn, SignedOut, UserButton} from '@clerk/nextjs'
import { Box, Container, Button, TextField, Typography, AppBar, Toolbar, Grid } from '@mui/material'

export default function Home() {
  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',  // Ensure you send proper headers
          origin: 'http://localhost:3000',
        },
      });
  
      if (!checkoutSession.ok) {
        const errorDetails = await checkoutSession.json();
        console.error('Error fetching checkout session:', errorDetails.message);
        return;
      }
  
      const checkoutSessionJson = await checkoutSession.json();
  
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });
  
      if (error) {
        console.warn('Stripe redirection error:', error.message);
      }
  
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  };

  return (
    <Container maxWidth="l00vw">
      <Head>
        <title>Flashcard App</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant = 'h6' style={{flexGrow: 1}}>Flashcard App</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
            {' '}
            Login
            </Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box
      sx={{
        textAlign: 'center',
        my: 4,
      }}>
        <Typography variant="h2" >Welcome to Flashcard SaaS</Typography>
        <Typography variant="h5" gutterBottom>
          The easiest way to make flashcards from your text
        </Typography>
        <Button variant="contained" color="primary" sx={{mt:2}} href="/generate">Create Flashcards</Button>
        <Button variant="contained" color="primary" sx={{mt:2}} href="/flashcards">Access Previous Flashcards</Button>
      </Box>
      <Box sx={{my: 6}}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing={4}>
          <Grid item sx={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>
              {' '}
              Simply input your text and let our software do the rest. Creating
              flashcards has never been easier.
            </Typography>
          </Grid>
          <Grid item sx={12} md={4}>
            <Typography variant="h6" gutterBottom >A.I. Powered</Typography>
            <Typography>
              {' '}
              Harness the power of Large Language Models to create the most cutting edge study material
            </Typography>
          </Grid>
          <Grid item sx={12} md={4}>
            <Typography variant="h6" gutterBottom >Cloud Storage</Typography>
            <Typography>
              {' '}
              Your flashcards are securely stored in the cloud for your convenience
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: 'center'}}>
        <Typography variant="h4">Pricing</Typography>
        <Grid container spacing={4}>
          <Grid item sx={12} md={6}>
            <Box sx={{
              p: 3,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 2,
            }}>
            <Typography variant="h6" gutterBottom>Basic</Typography>
            <Typography variant="h6" gutterBottom>$5 / Month</Typography>
            <Typography>
              {' '}
              Access to basic flashcard features and limited storage
            </Typography>
            <Button variant = "contained" color = "primary" sx={{mt: 2}} onClick={handleSubmit} >Choose Basics</Button>
            </Box>
          </Grid>
          <Grid item sx={12} md={6}>
          <Box sx={{
              p: 3,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 2,
            }}>
            <Typography variant="h6" gutterBottom>Pro</Typography>
            <Typography variant="h6" gutterBottom>$10 / Month</Typography>
            <Typography>
              {' '}
              Access to even more
            </Typography>
            <Button variant = "contained" color = "primary" sx={{mt: 2}} onClick={handleSubmit}>Choose Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
