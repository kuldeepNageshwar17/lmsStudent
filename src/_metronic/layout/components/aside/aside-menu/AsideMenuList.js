/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react'
import { Redirect, useLocation } from 'react-router'
import { NavLink ,Link } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import { toAbsoluteUrl, checkIsActive } from '../../../../_helpers'
import { shallowEqual, useSelector } from 'react-redux'



export function AsideMenuList ({ layoutProps }) {
  const location = useLocation()
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url)
      ? ` ${!hasSubmenu && 'menu-item-active'} menu-item-open `
      : ''
  }
  
  const  {auth}  = useSelector(
    ({ auth }) => ({
      auth: auth
    }),
    shallowEqual
  )
  return (
    <>
      {/* begin::Menu Nav */}
      {console.log("here in user" , auth)}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li
          className={`menu-item ${getMenuItemActive('/home', false)}`}
          aria-haspopup='true'
        >
          
          <div className='menu-link' onClick={() => window.location.href = "http://localhost:3001/searchpage"} >
              <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span> 
            <span className='menu-text' >Home</span>
          </div>
           
        </li>
        <li
          className={`menu-item ${getMenuItemActive('/dashboard', false)}`}
          aria-haspopup='true'
        >
          <NavLink className='menu-link' to='/dashboard'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>Dashboard</span>
          </NavLink>
        </li>
        
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {/* <li
          className={`menu-item ${getMenuItemActive('/Courses/Exam', false)}`}
          aria-haspopup='true'
        >
          <NavLink className='menu-link' to='/Courses/Exam'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>TestExam</span>
          </NavLink>
        </li> */}
        {/*end::1 Level*/}
         {/*begin::1 Level*/}
         {/* <li
          className={`menu-item ${getMenuItemActive('/Courses/Course', false)}`}
          aria-haspopup='true'
        >
          <NavLink className='menu-link' to='/Courses/Course'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>TestCourse</span>
          </NavLink>
        </li> */}
        {/*end::1 Level*/}
          {/*begin::1 Level*/}
         {auth && auth.user && auth.user.branch && auth.user.fees && ( <li
          className={`menu-item ${getMenuItemActive('/OnlineExam', false)}`}
          aria-haspopup='true'
        >
          <NavLink className='menu-link' to='/OnlineExam'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>Examinations</span>
          </NavLink>
        </li>)}
        {/*end::1 Level*/}

        {/*begin::1 Level*/}
        {auth && auth.user && auth.user.branch && auth.user.fees && ( <li
          className={`menu-item ${getMenuItemActive('/Courses', false)}`}
          aria-haspopup='true'
        >
          <NavLink className='menu-link' to='/Courses'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>Courses</span>
          </NavLink>
        </li>
        )}











{auth && auth.user && auth.user.branch && auth.user.fees && ( <li
          className={`menu-item ${getMenuItemActive('/test', false)}`}
          aria-haspopup='true'        >
          <NavLink className='menu-link' to='/test'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>Test</span>
          </NavLink>
        </li>
)}
       {auth && auth.user && auth.user.branch && auth.user.fees && ( <li
          className={`menu-item ${getMenuItemActive('/fees', false)}`}
          aria-haspopup='true'        >
          <NavLink className='menu-link' to='/fees'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>Fees</span>
          </NavLink>
        </li>
       )}
       {auth && auth.user && (!auth.user.branch || !auth.user.fees) && ( <li
          className={`menu-item ${getMenuItemActive('/MyCourses', false)}`}
          aria-haspopup='true'        >
          <NavLink className='menu-link' to='/MyCourses'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>MyCourses</span>
          </NavLink>
        </li>
       )}
        {auth && auth.user && (!auth.user.branch || !auth.user.fees) && (<li
          className={`menu-item ${getMenuItemActive('/MyTest', false)}`}
          aria-haspopup='true'        >
          <NavLink className='menu-link' to='/MyTest'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>MyTest</span>
          </NavLink>
        </li>
        )}
        {/* <li
          className={`menu-item ${getMenuItemActive('/search', false)}`}
          aria-haspopup='true'        >
          <NavLink className='menu-link' to='/search'>
            <span className='svg-icon menu-icon'>
              <SVG src={toAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>
            <span className='menu-text'>Search</span>
          </NavLink>
        </li> */}





        {/*end::1 Level*/}

        {/* Applications */}
        {/* begin::section */}
        {/* <li className="menu-section ">
            <h4 className="menu-text">Applications</h4>
            <i className="menu-icon flaticon-more-v2"></i>
          </li> */}
        {/* end:: section */}

        {/* eCommerce */}
        {/*begin::1 Level*/}
        {/* <li
              className={`menu-item menu-item-submenu ${getMenuItemActive(
                  "/e-commerce", true
              )}`}
              aria-haspopup="true"
              data-menu-toggle="hover"
          > */}
        {/* <NavLink className="menu-link menu-toggle" to="/e-commerce">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Shopping/Bag2.svg")}/>
            </span>
              <span className="menu-text">eCommerce</span>
              <i className="menu-arrow"/>
            </NavLink> */}
        <div className='menu-submenu'>
          {/* <ul className="menu-subnav">
           */}
          {/*begin::2 Level*/}
          {/* <li
                    className={`menu-item ${getMenuItemActive(
                        "/e-commerce/customers"
                    )}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/e-commerce/customers">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Customers</span>
                  </NavLink>
                </li> */}
          {/*end::2 Level*/}
          {/*begin::2 Level*/}
          {/* <li
                    className={`menu-item ${getMenuItemActive(
                        "/e-commerce/products"
                    )}`}
                    aria-haspopup="true"
                >
                  <NavLink className="menu-link" to="/e-commerce/products">
                    <i className="menu-bullet menu-bullet-dot">
                      <span/>
                    </i>
                    <span className="menu-text">Products</span>
                  </NavLink>
                </li> */}
          {/*end::2 Level*/}
          {/* </ul> */}
        </div>
        {/* </li> */}
        {/*end::1 Level*/}
      </ul>

      {/* end::Menu Nav */}
    </>
  )
}
