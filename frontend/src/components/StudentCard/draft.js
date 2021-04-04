import React, { useCallback, useContext, useEffect, useState, useRef, RefObject } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthStoreContext } from '../../stores';
import { observer } from 'mobx-react-lite';
import { ReactComponent as YakHaiMaLogoSVG } from '../../assets/svg/yakhaima_logo.svg';
import Modal from '../Modal';
import {searchStore} from '../../stores'
import './style.css'

const Navigation = observer(() => {
 const authStore = useContext(AuthStoreContext);
 const location = useLocation();
 const [isToggle, setIsToggle] = useState(false);
 const [isSearchFocus, setIsSearchFocus] = useState(false);
 // const [isFilterwork,setisFilterwork] = useState(false);
 const ref = useRef(null);

 type Event = MouseEvent | TouchEvent

 useEffect(() => {
  setIsToggle(false)
  setIsSearchFocus(false)
 }, [location])

 const toggleStyle = useCallback(() => {
  if (isToggle) {
   const containerElm = document.querySelector('#mcvev-topbar > .container');
   const containerLeft = containerElm?.getBoundingClientRect().left || 0;
   const containerWidth = containerElm?.clientWidth || 0;
   // const topbarElm = document.getElementById('mcvev-topbar');
   // const topbarWidth = topbarElm?.offsetWidth || 0;
   const menuElm = document.getElementById('mcvev-mainmenu');
   const menuWidth = menuElm?.offsetWidth || 0;
   return {
    right: `${window.innerWidth - (containerWidth + containerLeft) + menuWidth}px`,
    // right: `${window.innerWidth - topbarWidth + menuWidth}px`,
   } as React.CSSProperties;
  } else {
   return {
    right: '-10px',
   } as React.CSSProperties;
  }
 }, [isToggle]);

 const signOut = useCallback(() => {
  authStore.signOut();
 }, [authStore]);

 useOnClickOutside(ref, () => setIsSearchFocus(false));

 function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
 ) {
  useEffect(() => {
   const listener = (event: Event) => {
    const el = ref?.current
    // Do nothing if clicking ref's element or descendent elements
    if (!el || el.contains((event?.target as Node) || null)) {
     return
    }
    handler(event)
   }
   document.addEventListener(`mousedown`, listener)
   document.addEventListener(`touchstart`, listener)

   return () => {
    document.removeEventListener(`mousedown`, listener)
    document.removeEventListener(`touchstart`, listener)
   }
   // Reload only if ref or handler changes
  }, [ref, handler])
 }



 return (
  <>

   <nav id="mcvev-topbar" className="navbar fixed-top">
    <div className="container px-0 px-sm-3">
     <Link className="navbar-brand mcvev-textcolor-natural" id="mcvev-logo" to="/">
      <YakHaiMaLogoSVG />
      <span>Yak&middot;Hai&middot;Ma</span>
     </Link>

     
     {isSearchFocus ? (<div className='page-overlay'></div>) : null}

     <div id="mcvev-topbar-tool" className="d-flex align-items-center">
      <div>
       {isSearchFocus ? (<div className="position-absolute modal-container" ref={ref}><Modal searchStore = {searchStore}  /></div>) : null}
       <button className="mcvev-topbar-tool-button btn mcvev-circle mcvev-sm mcvev-soft"
        onClick={() => setIsSearchFocus(true)}>
        <i className="fas fa-search" aria-hidden="true"></i>
       </button>
       
      </div>
      <button
       className="mcvev-topbar-tool-button btn mcvev-circle mcvev-sm mcvev-soft"
       onClick={() => setIsToggle(!isToggle)}
      >
       <i className="fas fa-bars" aria-hidden="true"></i>
      </button>
      {authStore.isSignIn ? (
       <button className="mcvev-profile-button">
        <img src={authStore.user.avatar_url} className="mcvev-profile" alt="profile" />
       </button>
      ) : (
        <Link to={`/signin?redirect=${encodeURIComponent(window.location.pathname)}`}>
         <button
          className="btn mcvev-circle mcvev-sm mcvev-soft mcvev-profile-button"
         >
          <i className="fas fa-sign-in-alt" aria-hidden="true"></i>
         </button>
        </Link>
       )}
     </div>
    </div>
   </nav>
   <div id="mcvev-mainmenu" className="card mcvev-soft" style={toggleStyle()}>
    <ul className="pb-3">
     {authStore.isSignIn ? (
      <>
       <li className="py-2 px-4">
        <Link to="/my-reward" className="mcvev-textcolor-natural">
         รางวัลของฉัน
        </Link>
       </li>
      </>
     ) : (<></>)
     }

     {/* กิจกรรของฉัน */}
     {authStore.isSignIn ? (
      <>
       <li className="py-2 px-4">
        <Link to="/my-event" className="mcvev-textcolor-natural">
         กิจกรรมของฉัน
        </Link>
       </li>
      </>
     ) : (<></>)
     }


     {authStore.isSignIn ? (
      <li className="py-2 px-4">
       <Link
        to="/"
        className="mcvev-textcolor-natural"
        onClick={signOut}
       >
        ออกจากระบบ
       </Link>
      </li>
     ) : (
       <li className="py-2 px-4">
        <Link
         to={`/signin?redirect=${encodeURIComponent(window.location.pathname)}`}
         className="mcvev-textcolor-natural"
        >
         เข้าสู่ระบบ
       </Link>
       </li>
      )}
    </ul>
   </div>


  </>
 );
});