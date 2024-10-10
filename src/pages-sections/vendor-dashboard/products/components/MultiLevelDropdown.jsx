import ChevronRight from "@mui/icons-material/ChevronRight"; // GLOBAL CUSTOM COMPONENTS
import styled from "@mui/material/styles/styled";
// import CategoryMenu from "../../../../components/categories/category-menu"; // CUSTOM ICON COMPONENT
import Category from "../../../../icons/Category"; // STYLED COMPONENT
import Button from "@mui/material/Button";
import { Typography, Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
// import MegaMenu1 from "../../../../components/categories/mega-menu/mega-menu-1";
import MegaMenu2 from "../../../../components/categories/mega-menu/mega-menu-2";
import { categoryMenus } from "../../../../data/navigations"; // STYLED COMPONENT
import Card from "@mui/material/Card";
import { FlexBox } from "../../../../components/flex-box";
import Grid from "@mui/material/Grid"; // GLOBAL CUSTOM COMPONENTS
import { NavLink } from "../../../../components/nav-link"; // STYLED COMPONENTS

export default function Categories() {
  return <CategoryMenu render={handler => <CategoryMenuButton variant="text" onClick={e => handler(e)}>
          <div className="prefix">
            <Category fontSize="small" />
            <Typography>Categories</Typography>
          </div>

          <ChevronRight className="dropdown-icon" fontSize="small" />
        </CategoryMenuButton>} />;
}

function CategoryMenu({
    render
  }) {
    const [open, setOpen] = useState(false);
  
    const onClick = e => {
      e.stopPropagation();
      setOpen(open => !open);
    };
  
    const handleDocumentClick = useCallback(() => setOpen(false), []);
    useEffect(() => {
      window.addEventListener("click", handleDocumentClick);
      return () => window.removeEventListener("click", handleDocumentClick);
    }, [handleDocumentClick]);
    return <Wrapper open={open}>
        {render(onClick)}
  
        <CategoryList open={open} />
      </Wrapper>;
  }

function CategoryList({
open,
position = "absolute"
}) {
return <StyledRoot open={open} position={position}>
    {categoryMenus.map(item => {
    const {
        href,
        title,
        children,
        component,
        icon,
        offer
    } = item;
    const MegaMenu = component === MegaMenu1.name ? MegaMenu1 : MegaMenu2;
    return <CategoryListItem
                key={title}
                href={href}
                icon={icon}
                title={title}
                caret={!!children}
                render={component ? <MegaMenu data={children} banner={offer} /> : null}
                // render={null}
            />;
    })}
    </StyledRoot>;
}

function CategoryListItem(props) {
const {
    href,
    title,
    render,
    caret = true,
    icon: Icon
} = props;
return <Wrapper1>
    <Box>
        <div className="category-dropdown-link">
        {Icon ? <Icon fontSize="small" color="inherit" /> : null}
        <span className="title">{title}</span>
        {caret ? <ChevronRight fontSize="small" className="caret-icon" /> : null}
        </div>
    </Box>

    {render ? <div className="mega-menu">{render}</div> : null}
    </Wrapper1>;
}

function MegaMenu1({
    banner,
    data
  }) {
    return <ColumnList list={data} banner={null}>
        {/* {banner?.position === "bottom" ? <Box href={banner.href}>
            <Box position="relative" height={150} width="100%">
              <LazyImage fill alt="banner" src={banner.url} sx={{
            objectFit: "cover",
            objectPosition: "center center"
          }} />
            </Box>
          </Box> : null} */}
      </ColumnList>;
}

function ColumnList({
    list,
    children,
    banner,
    minWidth = 760
  }) {
    return <StyledRoot1 elevation={2} sx={{
      minWidth
    }}>
        <FlexBox px={2.5}>
          <Box flex="1 1 0">
            <Grid container spacing={4}>
              {list.map((item, ind) => <Grid item md={3} key={ind}>
                  <div className="title-link">{item.title}</div>
  
                  {item.children?.map((sub, ind) => <NavLink className="child-link" href={sub.href} key={ind}>
                      {sub.title}
                    </NavLink>)}
                </Grid>)}
            </Grid>
          </Box>
  
          {/* {banner?.position === "right" ? <Box mt={1.5}>
              <Link href={banner.href}>
                <LazyImage src={banner.url} width={137} height={318} alt="banner" />
              </Link>
            </Box> : null} */}
        </FlexBox>
  
        {children}
      </StyledRoot1>;
  }

export const StyledRoot1 = styled(Card)(({
theme
}) => ({
marginLeft: "1rem",
paddingBlock: "0.5rem",
"& .title-link, & .child-link": {
    color: "inherit",
    fontWeight: 600,
    display: "block",
    padding: "0.5rem 0px"
},
"& .child-link": {
    fontWeight: 400
},
"& .mega-menu-content": {
    borderRadius: 4,
    marginLeft: "1rem",
    padding: "0.5rem 0px",
    boxShadow: theme.shadows[3],
    transition: "all 250ms ease-in-out",
    backgroundColor: theme.palette.background.paper
}
}));

const StyledRoot = styled("div", {
shouldForwardProp: prop => prop !== "position" && prop !== "open"
})(({
theme,
position,
open
}) => ({
left: 0,
zIndex: 98,
right: "auto",
borderRadius: 4,
padding: "0.5rem 0px",
transformOrigin: "top",
boxShadow: theme.shadows[2],
position: position || "unset",
transition: "all 250ms ease-in-out",
transform: open ? "scaleY(1)" : "scaleY(0)",
backgroundColor: theme.palette.background.paper,
top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem"
}));

const Wrapper = styled("div", {
    shouldForwardProp: prop => prop !== "open"
})(({
open,
theme: {
    direction
}
}) => ({
cursor: "pointer",
position: "relative",
"& .dropdown-icon": {
    transition: "all 250ms ease-in-out",
    transform: `rotate(${open ? direction === "rtl" ? "-90deg" : "90deg" : "0deg"})`
}
})); 

const CategoryMenuButton = styled(Button)(({
    theme
  }) => ({
    width: 278,
    borderRadius: 4,
    backgroundColor: theme.palette.grey[100],
    ...(theme.direction === "rtl" && {
      ".dropdown-icon": {
        rotate: "180deg"
      }
    }),
    ".prefix": {
      gap: 8,
      flex: 1,
      display: "flex",
      alignItems: "center",
      color: theme.palette.grey[800]
    }
}));

const Wrapper1 = styled("div")(({
    theme
  }) => ({
    "& .category-dropdown-link": {
      height: 40,
      display: "flex",
      minWidth: "278px",
      cursor: "pointer",
      whiteSpace: "pre",
      padding: "0px 1rem",
      alignItems: "center",
      transition: "all 300ms ease-in-out",
      ".title": {
        flexGrow: 1,
        paddingLeft: "0.75rem"
      }
    },
    ":hover": {
      color: theme.palette.primary.main,
      background: theme.palette.action.hover,
      "& > .mega-menu": {
        display: "block"
      }
    },
    ".mega-menu": {
      top: 0,
      zIndex: 99,
      left: "100%",
      right: "auto",
      display: "none",
      position: "absolute"
    },
    ...(theme.direction === "rtl" && {
      ".caret-icon": {
        rotate: "180deg"
      }
    })
}));