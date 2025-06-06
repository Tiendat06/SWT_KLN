import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import styles from "~/styles/Pages/B2B/MediaDocument/login.module.scss";
import illustration from "~/assets/img/admin/login/admin_loginPage.png";
import {Link} from "react-router-dom";
import AppRoutesEnum from "~/enum/Route/AppRoutesEnum";
import {Helmet} from "react-helmet-async";
import {LOGIN_PAGE_TITLE} from "~/utils/Constansts";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <>
            <Helmet>
                <title>{LOGIN_PAGE_TITLE}</title>
            </Helmet>
            <div className={styles["login"]}>
                <div className={styles["login__header"]}>
                    <Link to={AppRoutesEnum.CustomerRoute}>
                        <h1 className={styles["login__logo"]}>KLN.</h1>
                        <p className={styles["login__tagline"]}>Đại Học Tôn Đức Thắng</p>
                    </Link>
                </div>

                <div className={styles["login__right"]}>
                    <div className={styles["login__form"]}>
                        <h2 className={styles["login__form-title"]}>Chào mừng trở lại!</h2>
                        <p className={styles["login__form-subtitle"]}>
                            Chào mừng trở lại! Vui lòng nhập thông tin của bạn.
                        </p>

                        {/* Email */}
                        <div className={styles["login__form-field"]}>
                            <label htmlFor="email" className={styles["login__form-label"]}>
                                Email
                            </label>
                            <InputText
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="p-inputtext-lg"
                            />
                        </div>

                        {/* Password */}
                        <div className={`${styles["login__form-field"]} ${styles["password-field"]}`}>
                            <label htmlFor="password" className={styles["login__form-label"]}>
                                Mật khẩu
                            </label>
                            <InputText
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mật khẩu"
                                className="p-inputtext-lg"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                            >
                                {showPassword ? (
                                    <i className="pi pi-eye-slash" />
                                ) : (
                                    <i className="pi pi-eye" />
                                )}
                            </button>
                        </div>

                        <Button
                            label="Đăng nhập"
                            className="p-button-lg p-button-primary"
                            onClick={handleLogin}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;