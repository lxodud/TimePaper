package com.timepaper.backend.global.config;

public class SecurityPathConfig {

  public static final String[] PUBLIC_GET_URLS = {
      "/api/timepapers/**"
  };

  public static final String[] PUBLIC_POST_URLS = {
      "/api/auth/login",
      "/api/auth/signup",
      "/api/auth/email-verification-codes",
      "/api/auth/email-verification-codes/validate"
  };

}
