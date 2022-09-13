import { useRef, useState, useEffect } from "react"
import { Link, Navigate } from "react-router-dom"
import { Form, Button, Stack, Container, Row, Col } from 'react-bootstrap'
import { AiOutlineCheck, AiOutlineClose, AiOutlineInfoCircle } from "react-icons/ai";
import axios from 'axios'
import { SIGN_UP_STORE } from "../api/apiURL"
import '../RegisterForm.css'
import SHA256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const MAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const PHONE_REGEX = /^[0-9-_]{10}$/;
const NAME_REGEX = /^[\u4e00-\u9fa5A-z0-9-_]{1,10}$/;

const RegisterR = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [account, setAccount] = useState('');
    const [validAccount, setValidAccount] = useState(false);
    const [accountFocus, setAccountFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [hashpw, setHashPw] = useState('')
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [storename, setStorename] = useState('');
    const [validStorename, setValidStorename] = useState(false);
    const [storenameFocus, setStorenameFocus] = useState(false);

    const [storeimg, setStoreimg] = useState('');
    const [validStoreimg, setValidStoreimg] = useState(false);

    const [location, setlocation] = useState('一餐');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const formStyle = {
        // position: 'absolute',
        right: '10%',
        left: '10%',
        border: '2px solid rgba(0, 0, 0, 0.05)',
        borderRadius: "1.5rem",
    }

    const hashing = (data) => {
        setPassword(data)
        const encrypt = SHA256(data).toString(CryptoJS.enc.Hex)
        console.log(encrypt)
        setHashPw(encrypt)
    }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidAccount(USER_REGEX.test(account));
    }, [account])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        setValidMatch(password === matchPwd);
    }, [password, matchPwd])

    useEffect(() => {
        setValidEmail(MAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        setValidStorename(NAME_REGEX.test(storename));
    }, [storename])

    useEffect(() => {
        setErrMsg('');
    }, [account, password, matchPwd, email, phone, storename])

    const imgchange = (e) => {
        const files = e.target.files;
        console.log(files)
        getBase64(files[0]);
    };
    const getBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result)
            setStoreimg(reader.result)
        };
        setValidStoreimg(true)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(account);
        const v2 = PWD_REGEX.test(password);
        const v3 = MAIL_REGEX.test(email);
        const v4 = PHONE_REGEX.test(phone);
        const v5 = NAME_REGEX.test(storename);
        if (!v1 || !v2 || !v3 || !v4 || !v5) {
            setErrMsg("Invalid Entry");
            return;
        }
        // console.log(account, password);
        console.log(location)

        try {
            const response = await axios.post(SIGN_UP_STORE,
                JSON.stringify({ account, password, email, phone, storename, location, storeimg }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    // withCredentials: true
                }
            );
            // console.log(response.data);
            console.log(JSON.stringify(response))
            setSuccess(true);
            //clear state and controlled inputs
            //need value attrib on inputs for this
            setAccount('');
            setPassword('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <div>
                    <Navigate to={'/'} />
                </div>
            ) : (
                <div>
                    <Container >
                        <Row className="justify-content-center">
                            <Col xs={10} md={6} >
                                <Form onSubmit={handleSubmit}  style={formStyle} >
                                    <h1 style={{ marginBottom: '30px', fontSize: '30px', textAlign: 'center', marginTop: '1rem' }} >Restaurant Register</h1>
                                    <Form.Group className="mb-3 mx-4">
                                        <Form.Label>
                                            Username:
                                            <AiOutlineCheck className={validAccount ? "valid" : "hide"} />
                                            <AiOutlineClose className={validAccount || !account ? "hide" : "invalid"} />
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Username"
                                            ref={userRef}
                                            autoComplete="off"
                                            onChange={(e) => setAccount(e.target.value)}
                                            value={account}
                                            required
                                            aria-invalid={validAccount ? "false" : "true"}
                                            aria-describedby="uidnote"
                                            onFocus={() => setAccountFocus(true)}
                                            onBlur={() => setAccountFocus(false)}
                                        />
                                        <Form.Text className={accountFocus && account && !validAccount ? "instructions" : "offscreen"}>
                                            <AiOutlineInfoCircle />
                                            4到24個英數字混合
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3 mx-4">
                                        <Form.Label>
                                            Password:
                                            <AiOutlineCheck className={validPassword ? "valid" : "hide"} />
                                            <AiOutlineClose className={validPassword || !password ? "hide" : "invalid"} />
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            value={password}
                                            required
                                            aria-invalid={validPassword ? "false" : "true"}
                                            aria-describedby="pwdnote"
                                            onFocus={() => setPasswordFocus(true)}
                                            onBlur={() => setPasswordFocus(false)}
                                        />
                                        <Form.Text className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}>
                                            <AiOutlineInfoCircle />
                                            8到24個英數字混合，且至少一個大寫字母及特殊字元 (
                                            <span aria-label="exclamation mark">!</span>
                                            <span aria-label="at symbol">@</span>
                                            <span aria-label="hashtag">#</span>
                                            <span aria-label="dollar sign">$</span>
                                            <span aria-label="percent">%</span>)。
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3 mx-4">
                                        <Form.Label>
                                            Confirm Password:
                                            <AiOutlineCheck className={validMatch && matchPwd ? "valid" : "hide"} />
                                            <AiOutlineClose className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Comfirm Password"
                                            onChange={(e) => setMatchPwd(e.target.value)}
                                            value={matchPwd}
                                            required
                                            aria-invalid={validMatch ? "false" : "true"}
                                            aria-describedby="confirmnote"
                                            onFocus={() => setMatchFocus(true)}
                                            onBlur={() => setMatchFocus(false)}
                                        />
                                        <Form.Text className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                            <AiOutlineInfoCircle />
                                            密碼不一致
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3 mx-4" >
                                        <Form.Label>
                                            E-mail:
                                            <AiOutlineCheck className={validEmail ? "valid" : "hide"} />
                                            <AiOutlineClose className={validEmail || !email ? "hide" : "invalid"} />
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="E-mail"
                                            autoComplete="off"
                                            onChange={(e) => setEmail(e.target.value)}
                                            value={email}
                                            required
                                            aria-invalid={validEmail ? "false" : "true"}
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)}
                                        />
                                        <Form.Text className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                            <AiOutlineInfoCircle />
                                            錯誤的Email格式<br />
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3 mx-4">
                                        <Form.Label>
                                            Phone Number:
                                            <AiOutlineCheck className={validPhone ? "valid" : "hide"} />
                                            <AiOutlineClose className={validPhone || !phone ? "hide" : "invalid"} />
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Phone Number"
                                            autoComplete="off"
                                            onChange={(e) => setPhone(e.target.value)}
                                            value={phone}
                                            required
                                            aria-invalid={validPhone ? "false" : "true"}
                                            onFocus={() => setPhoneFocus(true)}
                                            onBlur={() => setPhoneFocus(false)}
                                        />
                                        <Form.Text className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                                            <AiOutlineInfoCircle />
                                            錯誤的電話號碼格式<br />
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3 mx-4">
                                        <Form.Label>
                                            Restaurant Name:
                                            <AiOutlineCheck className={validStorename ? "valid" : "hide"} />
                                            <AiOutlineClose className={validStorename || !storename ? "hide" : "invalid"} />
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Restaurant Name"
                                            autoComplete="off"
                                            onChange={(e) => setStorename(e.target.value)}
                                            value={storename}
                                            required
                                            aria-invalid={validStorename ? "false" : "true"}
                                            onFocus={() => setStorenameFocus(true)}
                                            onBlur={() => setStorenameFocus(false)}
                                        />
                                        <Form.Text className={storenameFocus && storename && !validStorename ? "instructions" : "offscreen"}>
                                            <AiOutlineInfoCircle />
                                            不可有特殊字元<br />
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3 mx-4" >
                                        <Form.Label>Location</Form.Label>
                                        <Form.Select
                                            onChange={(e) => setlocation(e.target.value)}
                                        >
                                            <option value={'一餐'}>一餐</option>
                                            <option value={'三餐'}>三餐</option>
                                            <option value={'教餐'}>教餐</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group controlId="formFile" className="mb-3 mx-4">
                                        <Form.Label>Store picture</Form.Label>
                                        <Form.Control type="file" accept="image/*" onChange={imgchange} />
                                    </Form.Group>

                                    <Stack className="mx-4 mt-4 mb-3">
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            className="rounded-pill"
                                            style={{ backgroundColor: 'rgb(62, 158, 246)', border: 'none' }}
                                            disabled={!validAccount || !validPassword || !validMatch || !validEmail || !validPhone || !validStorename  ? true : false}
                                        >
                                            Sign Up
                                        </Button>
                                    </Stack>

                                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                                    <p style={{ fontSize: '20px', textAlign: 'center' }}>
                                        Already registered?<br />
                                        <span className="line">
                                            <Link to="/login" >Sign In</Link>
                                        </span>
                                    </p>
                                </Form>
                            </Col>
                        </Row>
                        <Row>
                            <div className="mt-5" ></div>
                        </Row>
                    </Container>

                </div>
            )}
        </>
    )
}

export default RegisterR
