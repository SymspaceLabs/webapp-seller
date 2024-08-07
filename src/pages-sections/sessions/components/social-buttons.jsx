import { Fragment } from "react";
import Image from "next/image"; // MUI

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider"; // CUSTOM COMPONENTS

import { Span } from "../../../components/Typography"; // IMPORT IMAGES

import googleLogo from "../../../../public/assets/images/icons/google-1.svg";
import facebookLogo from "../../../../public/assets/images/icons/facebook-1.svg"; // =======================================
import githubLogo from "../../../../public/assets/images/icons/github-white.svg"; // =======================================
import appleLogo from "../../../../public/assets/images/icons/apple-white.svg"; // =======================================

// =======================================
export default function SocialButtons(props) {
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

      <Box sx={{ display:'flex', gap:2 }}>
        <Button onClick={()=>onLogin("apple")} fullWidth size="large" sx={{ fontFamily: 'Helvetica', fontSize: 12, background:'#1A1D21', color:'#fff', my:1,  '&:hover': { background: 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)' } }}  startIcon={<Image alt="apple" src={appleLogo} />} />
        <Button onClick={()=>onLogin("google")} fullWidth size="large"  sx={{ fontFamily: 'Helvetica', fontSize: 12, background:'#1A1D21', color:'#fff', my:1,  '&:hover': { background: 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)' } }}  startIcon={<Image alt="google" src={googleLogo} />} />
        <Button onClick={()=>onLogin("facebook")} fullWidth size="large"  sx={{ fontFamily: 'Helvetica', fontSize: 12, background:'#1A1D21', color:'#fff', my:1,  '&:hover': { background: 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)' } }}  startIcon={<Image alt="facebook" src={facebookLogo} />} />
        <Button onClick={()=>onLogin("github")} fullWidth size="large" sx={{ fontFamily: 'Helvetica', fontSize: 12, background:'#1A1D21', color:'#fff', my:1,  '&:hover': { background: 'linear-gradient(90deg, #3084FF 0%, #1D4F99 100%)' } }} startIcon={<Image alt="github" src={githubLogo} />} />
      </Box>
    </Fragment>;
}