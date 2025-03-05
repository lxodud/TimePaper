package com.timepaper.backend.global.exception.handler;

import com.timepaper.backend.global.dto.ApiResponse;
import com.timepaper.backend.global.exception.ErrorCode;
import com.timepaper.backend.global.exception.custom.common.GlobalException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(GlobalException.class)
  public ResponseEntity<ApiResponse<Object>> exceptionHandler(GlobalException ex) {
    return ResponseEntity.status(ex.getErrorCode().getStatus())
        .body(ApiResponse
            .error(ex.getErrorCode().getMessage(), ex.getErrorCode().getCode()));
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ApiResponse<Object>> methodArgumentNotValidHandler(
      MethodArgumentNotValidException ex) {

    List<String> errorMessages = ex.getBindingResult().getFieldErrors()
        .stream()
        .map(FieldError::getDefaultMessage)
        .collect(Collectors.toList());

    String errorMessage = errorMessages.isEmpty()
        ? ErrorCode.INVALID_INPUT.getMessage()
        : errorMessages.getFirst();

    return ResponseEntity
        .status(ErrorCode.INVALID_INPUT.getStatus())
        .body(ApiResponse.error(errorMessage,
            ErrorCode.INVALID_INPUT.getCode()));
  }

  @ExceptionHandler(MaxUploadSizeExceededException.class)
  public ResponseEntity<ApiResponse<Object>> malUploadSizeExceededHandler(
      MaxUploadSizeExceededException ex) {
    return ResponseEntity.status(ErrorCode.PAYLOAD_TOO_LARGE.getStatus())
        .body(ApiResponse
            .error(ErrorCode.PAYLOAD_TOO_LARGE.getMessage(),
                ErrorCode.PAYLOAD_TOO_LARGE.getCode()));
  }

  /**
   * 최종 처리는 배포 마지막에
   */
//  @ExceptionHandler(RuntimeException.class)
//  public ResponseEntity<ApiResponse<Object>> exceptionHandler(RuntimeException ex) {
//    return ResponseEntity.status(ErrorCode.SERVER_ERROR.getStatus())
//        .body(ApiResponse
//            .error(ErrorCode.SERVER_ERROR.getMessage(), ErrorCode.SERVER_ERROR.getCode()));
//  }


}
