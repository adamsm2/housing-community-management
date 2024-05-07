package pl.adamsm2.backend;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@SecurityRequirement(name = "bearer-key")
public class TestController {

    @GetMapping
    public String test() {
        return "Test6!";
    }
}
