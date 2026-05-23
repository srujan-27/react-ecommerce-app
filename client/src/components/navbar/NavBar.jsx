import { Link, NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'
import amazonLogo from '../../assets/amazon-logo.webp'
import { useEffect, useState } from 'react'
import { getUser } from '../../utils/api'

export default function NavBar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('TOKEN')
    setIsLoggedIn(!!token)

    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('TOKEN'))
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      getUser(localStorage.getItem('TOKEN')).then(setUser)
    } else {
      setUser(null)
    }
  }, [isLoggedIn])

  function logout() {
    localStorage.removeItem('TOKEN')
    window.dispatchEvent(new Event("storage"))
    setIsLoggedIn(false)
  }

  function createNavItems() {
    if (!isLoggedIn) {
      return (
        <Link className={styles.login} to="/login">Login</Link>
      )
    }

    if (isLoggedIn && user) {
      return (
        <>
          <p className={styles.name}>{`${user.firstName} ${user.lastName}`}</p>
          <NavLink className={styles.login} to="/cart">Cart</NavLink>
          <button className={styles.logout} onClick={logout}>Logout</button>
        </>
      )
    }

    // While waiting for user to load, show nothing
    return null;
  }

  return (
    <div className={styles.navbar}>
      <Link to="/"><img className={styles.logo} src={amazonLogo} alt="Amazon Logo" /></Link>
      <div className={styles['nav-items-container']}>
        {createNavItems()}
      </div>
    </div>
  )
}
