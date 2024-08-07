"use client";

import { Fragment, useCallback, useState } from "react";
import { usePathname } from "next/navigation"; // LOCAL CUSTOM COMPONENTS
import Button from "@mui/material/Button";
import BoxLink from "./components/box-link";
import LogoWithTitle from "./components/logo-title";
import LoginBottom from "./components/login-bottom";
import SocialButtons from "./components/social-buttons"; // GLOBAL CUSTOM COMPONENTS
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider"; // CUSTOM COMPONENTS
import { Span } from "../../components/Typography"; // IMPORT IMAGES
import Sticky from "../../components/sticky";
import { FlexRowCenter } from "../../components/flex-box"; // COMMON STYLED COMPONENT
import Header from "../../components/header";
import NavigationList from "../../components/navbar/nav-list/nav-list";

import { Wrapper } from "./styles";
export default function AuthLayout({children}) {
  const pathname = usePathname();
  let BOTTOM_CONTENT = null;
  let TITLE = null;
  const toggleIsFixed = useCallback(fixed => setIsFixed(fixed), []);
  const [isFixed, setIsFixed] = useState(false);
  const HEADER_SLOT = <div>
      <NavigationList />
    </div>;

  if (pathname === "/login") {
    BOTTOM_CONTENT = <LoginBottom />;
    TITLE = <LogoWithTitle title="Continue your Journey" subTitle="Log in to an existing account using your email" />;
  }


  if (pathname === "/register") {
    BOTTOM_CONTENT = <Fragment >
        <Box my={3}>
          <Divider>
            <Span lineHeight={1} px={1} sx={{color:'#fff'}}>
              or
            </Span>
          </Divider>
        </Box>
        <Button href="/register-partner" fullWidth size="large" sx={{ color:'#fff', borderRadius:'12px', fontFamily: 'Helvetica', fontWeight: 700, fontSize: '22px', backdropFilter: 'blur(50px)', py:1.5, background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)', fontSize: 22, boxShadow: "0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)" }} >
          Create a business profile
        </Button>
        <Box sx={{display:"flex", alignItems:'center', justifyContent:'center', color:'#fff', gap:1, pt:2, pb:5}}>
          Already have an account? <BoxLink title="Sign in" href="/login" />
        </Box>
      </Fragment>;
    TITLE = <LogoWithTitle title="Begin your Journey" subTitle="Create an account using your email" />;
    return <Fragment>
         <Fragment>
          <Header position="fixed" isFixed={true} midSlot={HEADER_SLOT} showLoginButtons={false} />
          <Divider />
        </Fragment>
       <Box sx={{ position: 'relative', backgroundColor: '#3F3F3F', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '150vh', px: 2  }} flexDirection="column" minHeight="150vh" px={2}>
        <Box style={{ zIndex: 1, maxWidth:700}}>
          <Wrapper sx={{background: 'linear-gradient(0deg, rgba(140, 140, 140, 0.3), rgba(140, 140, 140, 0.3)), rgba(255, 255, 255, 0.1)', borderRadius: '50px' }}>
            {TITLE}
            {children}
            <SocialButtons />
            {BOTTOM_CONTENT}
          </Wrapper>
        </Box>
        <Box sx={{ zIndex: 0, position: 'absolute', top: '50%', left: '50%',  transform: 'translate(-50%, -50%)',  width: '890px', height: 1100, background: '#0366FE', borderRadius: '100px',  opacity: 0.4, filter: 'blur(100px)', backdropFilter: 'blur(100px)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',   }} />
    </Box>
    </Fragment>
    // return <FlexRowCenter sx={{ position:'relative', backgroundColor: '#3F3F3F' }} flexDirection="column" minHeight="100vh" px={2}>
    //     <Box style={{ zIndex: 1, minWidth: 750, height: 1000, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
    //       <Box style={{ alignSelf: 'stretch', flex: '1 1 0', position: 'relative' }}>
    //         <Box sx={{ borderRadius:'80px', background: 'rgba(255,255,255,0.2)', width: 750, height: '100%', left: 0, top: 0, position: 'absolute', boxShadow: '0px 1.0028538703918457px 20.55850601196289px rgba(255, 255, 255, 0.80) inset', backdropFilter: 'blur(20.06px)' }}></Box>
    //         <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center' }}>
    //           <Wrapper>
    //             {TITLE}
    //             {children}
    //             <SocialButtons />
    //             {BOTTOM_CONTENT}
    //           </Wrapper>
    //         </Box>
    //       </Box>
    //     </Box>
    //     <Box sx={{ position: 'absolute', top: '50%', left: '50%', width: '890px', height: '1167px', background: 'rgba(3, 102, 254, 0.8)', borderRadius: '50px', zIndex: 0, opacity: 0.2, filter: 'blur(50px)', backdropFilter: 'blur(50px)', transform: 'translate(-50%, -50%)', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',  }} />
    // </FlexRowCenter>
  }

  if (pathname === "/register-partner") {
    BOTTOM_CONTENT = <FlexRowCenter sx={{ fontFamily: 'Helvetica', color:'#fff', flexDirection:'column'}} gap={1} mt={3}>
        <Box sx={{pt:2, pb:5}}>
          Already have an account? <BoxLink title="Sign in" href="/login" />
        </Box>
      </FlexRowCenter>;
    TITLE = <LogoWithTitle title="simulate reality together" subTitle="Create an account using your email"  />;

    return <Fragment>
      <Sticky fixedOn={0} onSticky={toggleIsFixed} scrollDistance={300}>
        <Header position="fixed" isFixed={isFixed} midSlot={HEADER_SLOT} showLoginButtons={false} />
        <Divider />
      </Sticky>
      <Box sx={{ position: 'relative', backgroundColor: '#3F3F3F', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '150vh', px: 2  }} flexDirection="column" minHeight="150vh" px={2}>
        <Box style={{ zIndex: 1, maxWidth:700}}>
          <Wrapper sx={{background: 'linear-gradient(0deg, rgba(140, 140, 140, 0.3), rgba(140, 140, 140, 0.3)), rgba(255, 255, 255, 0.1)', borderRadius: '50px' }}>
            {TITLE}
            {children}
            {BOTTOM_CONTENT}
          </Wrapper>
        </Box>
        <Box sx={{ zIndex: 0, position: 'absolute', top: '50%', left: '50%', width: '890px', height: 1000, background: 'linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%)', borderRadius: '50px',  transform: 'translate(-50%, -50%)',   opacity: 0.4, filter: 'blur(100px)', backdropFilter: 'blur(100px)',boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 0px -1px 1px rgba(255, 255, 255, 0.5), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)',   }} />
      </Box>
    </Fragment>;
  }


  if (pathname === "/reset-password") {
    return <FlexRowCenter flexDirection="column" minHeight="100vh" px={2}>
        <Wrapper elevation={3}>{children}</Wrapper>
      </FlexRowCenter>;
  }

  return <FlexRowCenter sx={{ backgroundColor: '#3F3F3F' }} flexDirection="column" minHeight="100vh" px={2}>
              <Box style={{ minWidth: 750, height: 1000, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', display: 'inline-flex' }}>
                <Box style={{ alignSelf: 'stretch', flex: '1 1 0', position: 'relative' }}>
                  <img style={{ borderRadius:'80px', background: 'rgba(255,255,255,0.2)', width: 750, height: '100%', left: 0, top: 0, position: 'absolute', boxShadow: '0px 1.0028538703918457px 20.55850601196289px rgba(255, 255, 255, 0.80) inset', backdropFilter: 'blur(20.06px)' }} src="/assets/images/background/Rectangle.png" />
                  <Box style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center' }}>
                    <Wrapper>
                      {TITLE}
                      {children}
                      <SocialButtons />
                      {BOTTOM_CONTENT}
                    </Wrapper>
                  </Box>
                </Box>
            </Box>
          {/* <Box sx={{ position: 'relative', borderRadius: '80px', backdropFilter: 'blur(50px)', boxShadow: 'none', boxShadow: '0px 8px 6px rgba(0, 0, 0, 0.05), inset 2px 3px 3px -3px rgba(255, 255, 255, 0.6), inset 0px -1px 1px rgba(255, 255, 255, 0.25), inset 0px 1px 1px rgba(255, 255, 255, 0.25)' }}>
            <Box sx={{ position: 'absolute', background: 'rgba(255, 255, 255, 0.4)', boxShadow: 'inset 0px 3.00856px 6.01712px rgba(255, 255, 255, 0.4), inset 0px -3.00856px 9.02569px rgba(255, 255, 255, 0.5), inset 0px -1.50428px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 20.0571px 20.0571px rgba(255, 255, 255, 0.24), inset 0px 1.00285px 20.5585px rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10.0285px)'}}></Box>
            <Box sx={{ borderRadius: '80px', background: 'linear-gradient(0deg, rgba(140, 140, 140, 0.3), rgba(140, 140, 140, 0.3)), rgba(255, 255, 255, 0.1)' }}>
              <Wrapper elevation={3}>
                {TITLE}
                {children}
                <SocialButtons />
                {BOTTOM_CONTENT}
              </Wrapper>
            </Box>
            
          </Box> */}
    </FlexRowCenter>;
}