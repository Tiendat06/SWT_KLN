import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import styles from "~/styles/Pages/B2B/Auth/login.module.scss";
import illustration from "~/assets/img/admin/login/admin_loginPage.png";
import { authService } from "~/services/LoginService";
import { showToast } from "~/utils/ShowToast";
import { useAppContext } from "~/context/AppContext";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useAppContext();

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Vui lòng nhập đầy đủ thông tin đăng nhập'
            });
            return;
        }

        setIsLoading(true);
        try {
            const result = await authService.loginService(username, password);
            
            if (result && result.data) {
                showToast({
                    toastRef: toast,
                    severity: 'success',
                    summary: 'Thành công',
                    detail: `Chào mừng ${result.data.Username || result.data.username}!`
                });
                
                // Redirect về trang admin
                navigate('/admin');
            } else {
                showToast({
                    toastRef: toast,
                    severity: 'error',
                    summary: 'Đăng nhập thất bại',
                    detail: result?.message || 'Tên đăng nhập hoặc mật khẩu không chính xác'
                });
            }
        } catch (error) {
            console.error('Login error:', error);
            showToast({
                toastRef: toast,
                severity: 'error',
                summary: 'Lỗi',
                detail: 'Có lỗi xảy ra trong quá trình đăng nhập'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles["login"]}>
            <div className={styles["login__header"]}>
                <h1 className={styles["login__logo"]}>KLN.</h1>
                <p className={styles["login__tagline"]}>Đại Học Tôn Đức Thắng</p>
            </div>
            <div className={styles["login__background"]}>
                <div className={styles["login__left"]}>
                    <img
                        src={illustration}
                        alt="Illustration"
                        className={styles["login__image"]}
                    />
                </div>
                <div className={styles["login__right"]}>
                    <div className={styles["login__form"]}>
                        <h2 className={styles["login__form-title"]}>Chào mừng trở lại!</h2>
                        <p className={styles["login__form-subtitle"]}>
                            Chào mừng trở lại! Vui lòng nhập thông tin của bạn.
                        </p>

                        {/* Username */}
                        <div className={styles["login__form-field"]}>
                            <label htmlFor="username" className={styles["login__form-label"]}>
                                Tên đăng nhập
                            </label>
                            <InputText
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Tên đăng nhập"
                                className="p-inputtext-lg"
                                disabled={isLoading}
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
                                disabled={isLoading}
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
                            label={isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
                            className="p-button-lg p-button-primary"
                            onClick={handleLogin}
                            disabled={isLoading}
                            loading={isLoading}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;