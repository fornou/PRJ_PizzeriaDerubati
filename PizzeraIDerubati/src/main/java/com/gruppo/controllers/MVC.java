package com.gruppo.controllers;

public class MVC {
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MVC {
	
	@GetMapping("")
	String home() {
		return "pizze";
	}
}
