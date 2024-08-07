"use client";

import { useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Grid from "@mui/material/Grid";

import { Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import Drawer from "@mui/material/Drawer";
import useMediaQuery from "@mui/material/useMediaQuery"; // LOGIN FORM
import Image from "next/image"; // MUI

import { LoginPageView } from "../../../pages-sections/sessions/page-view"; // GLOBAL CUSTOM COMPONENTS

import { MiniCart } from "../../../components/mini-cart"; // LOGIN PAGE SECTIONS
import { Box } from '@mui/material';

import { Wrapper } from "../../../pages-sections/sessions/styles";
import LogoWithTitle from "../../../pages-sections/sessions/components/logo-title";
import LoginBottom from "../../../pages-sections/sessions/components/login-bottom";
// import SocialButtons from "../../../pages-sections/sessions/components/social-buttons"; // ==============================================================
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider"; // CUSTOM COMPONENTS
import { Span } from "../../../components/Typography"; // IMPORT IMAGES
import googleLogo from "../../../../public/assets/images/icons/google-1.svg";
import facebookLogo from "../../../../public/assets/images/icons/facebook-1.svg"; // =======================================
import githubLogo from "../../../../public/assets/images/icons/github-white.svg"; // =======================================
import appleLogo from "../../../../public/assets/images/icons/apple-white.svg"; // =======================================

// ==============================================================
export default function DialogDrawer(props) {
  const { dialogOpen, sidenavOpen, toggleDialog, toggleSidenav } = props;
  const isMobile = useMediaQuery(theme => theme.breakpoints.down("xs"));

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  return (
    <Fragment>
      <Dialog PaperProps={{ style: { backgroundColor: 'transparent', boxShadow: 'none', borderRadius: '80px', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)' },}} scroll="body" open={dialogOpen} fullWidth={isMobile} onClose={toggleDialog} sx={{ zIndex: 9999 }}>
        {/* <Box>
          <Box sx={{backgroundImage: "url('/assets/images/background/Rectangle.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', mixBlendMode: 'overlay',  }}>
            <Wrapper>
              <LogoWithTitle title="Continue your Journey" subTitle="Log in to an existing account using your email" />
              <LoginPageView closeDialog={toggleDialog} setSnackbarOpen={setSnackbarOpen} />
              <SocialButtons />
              <LoginBottom />
            </Wrapper>
          </Box>
        </Box> */}
          <Box style={{ width: 580, height: 885, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
            <Box style={{ alignSelf: 'stretch', flex: '1 1 0', position: 'relative' }}>
              <img style={{ background: 'rgba(255,255,255,0.2)', width: 580, height: 885, left: 0, top: 0, position: 'absolute', boxShadow: '0px 1.0028538703918457px 20.55850601196289px rgba(255, 255, 255, 0.80) inset', backdropFilter: 'blur(20.06px)'}} src="/assets/images/background/Rectangle.png"/>
              <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center'}}>
                <Wrapper>
                  <LogoWithTitle title="Continue your Journey" subTitle="Log in to an existing account using your email" />
                  <LoginPageView closeDialog={toggleDialog} setSnackbarOpen={setSnackbarOpen} />
                  <SocialButtons />
                  <LoginBottom />
                </Wrapper>
              </Box>
            </Box>
          </Box>
      </Dialog>

      <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav} sx={{ zIndex: 9999 }}>
        <MiniCart toggleSidenav={toggleSidenav} />
      </Drawer>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          Login Successful!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}


export const SocialButtons = () => {

  const onLogin = async (route) => {
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/callback/${route}`
  };

  return <Fragment>

      <Box my={3}>
        <Divider>
          <Span lineHeight={1} px={1} sx={{color:'#fff'}}>
            or
          </Span>
        </Divider>
      </Box>

      <Grid container spacing={3} alignItems="center">
        <Grid item sm={6} xs={12}>
            <Button onClick={()=>onLogin("facebook")} fullWidth size="large"  sx={{ fontFamily: 'Helvetica', fontSize: 12, background:'#1A1D21', color:'#fff', my:1,  '&:hover': { background: 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)' } }}  startIcon={<Image alt="facebook" src={facebookLogo} />}>
              Facebook Account
            </Button>

            <Button onClick={()=>onLogin("google")} fullWidth size="large"  sx={{ fontFamily: 'Helvetica', fontSize: 12, background:'#1A1D21', color:'#fff', my:1,  '&:hover': { background: 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)' } }}  startIcon={<Image alt="google" src={googleLogo} />}>
              Google Account
            </Button>
        </Grid>
       

        <Grid item sm={6} xs={12}>
          <Button onClick={()=>onLogin("github")} fullWidth size="large" sx={{ fontFamily: 'Helvetica', fontSize: 12, background:'#1A1D21', color:'#fff', my:1,  '&:hover': { background: 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)' } }} startIcon={<Image alt="github" src={githubLogo} />}>
            Github Account
          </Button>

          <Button onClick={()=>onLogin("apple")} fullWidth size="large" sx={{ fontFamily: 'Helvetica', fontSize: 12, background:'#1A1D21', color:'#fff', my:1,  '&:hover': { background: 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)' } }}  startIcon={<Image alt="apple" src={appleLogo} />}>
            Apple Account
          </Button>
        </Grid>
      </Grid>
    </Fragment>;
}