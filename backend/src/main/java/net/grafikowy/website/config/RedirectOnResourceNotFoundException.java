package net.grafikowy.website.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by DKUNERT on 2017-12-17.
 */
@ControllerAdvice
public class RedirectOnResourceNotFoundException {

	@ExceptionHandler(value = NoHandlerFoundException.class)
	public Object handleStaticResourceNotFound(final NoHandlerFoundException ex, HttpServletRequest req, RedirectAttributes redirectAttributes) {
		if (req.getRequestURI().startsWith("/api"))
			return this.getApiResourceNotFoundBody(ex, req);
		else {
			redirectAttributes.addFlashAttribute("errorMessage", "My Custom error message");
			return "redirect:/index.html";
		}
	}

	private ResponseEntity<String> getApiResourceNotFoundBody(NoHandlerFoundException ex, HttpServletRequest req) {
		return new ResponseEntity<>("Not Found !!", HttpStatus.NOT_FOUND);
	}
}
