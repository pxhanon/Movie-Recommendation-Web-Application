import styles from '../styles/Login.module.css'

import Head from "next/head"
import Link from 'next/link'
import { useRouter } from "next/router"

import { useEffect, useState } from "react"

import { magic } from "../lib/magic-client";

const Login = () => {
    const [email, setEmail] = useState("")
    const [userMsg, setUserMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter()

    useEffect(() => {
        const handleComplete = () => {
          setIsLoading(false);
        };
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);
    
        return () => {
          router.events.off("routeChangeComplete", handleComplete);
          router.events.off("routeChangeError", handleComplete);
        };
      }, [router]);

    const handleOnChangeEmail = (e) => {
        setUserMsg("")
        const email = e.target.value
        setEmail(email)
    }
    
    const handleLoginWithEmail = async (e) => {
        e.preventDefault()

        if (email) {
            if (email === "pxhanonxhumparat@gmail.com") {
                try {
                    setIsLoading(true)
                    const didToken = await magic.auth.loginWithMagicLink({ email });
                    console.log({ didToken });
                    if (didToken) {
                        const response = await fetch("/api/login", {
                            method: "POST",
                            headers: {
                              Authorization: `Bearer ${didToken}`,
                              "Content-Type": "application/json",
                            },
                        });
              
                        const loggedInResponse = await response.json();
                        if (loggedInResponse.done) {
                            router.push("/");
                        } else {
                            setIsLoading(false);
                            setUserMsg("Something went wrong logging in");
                        }
                    }
                  } catch (error) {
                    console.error('Something went wrong logging in', error)
                    setIsLoading(false)
                  }
                // router.push('/')
            } else {
                setUserMsg("Something went wrong logging in")
                setIsLoading(false)
            }
        } else {
            setUserMsg("Enter a valid email address")
            setIsLoading(false)
        }
    }

    return (
        <div>
            <Head>
                <title>SignIn</title>
            </Head>

            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <Link className={styles.logoLink} href="/">
                        <div className={styles.logoWrapper}>
                            R E C
                        </div>
                    </Link>
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                <h1 className={styles.signinHeader}>Sign In</h1>

                <input
                    type="text"
                    placeholder="Email address"
                    className={styles.emailInput}
                    onChange={handleOnChangeEmail}
                />

                <p className={styles.userMsg}>{userMsg}</p>
                <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
                    {isLoading ? "Loading..." : "Sign In"}
                </button>
                </div>
            </main>
        </div>
    )
}

export default Login