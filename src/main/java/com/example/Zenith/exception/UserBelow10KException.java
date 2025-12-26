package com.example.Zenith.exception;

public class UserBelow10KException extends RuntimeException {
    public UserBelow10KException(String message) {

        super(message);
    }
}
