package pl.adamsm2.backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping
    public String test() {
        return "Test6!";
    }

    @GetMapping("/frontend")
    public String frontendTest() {
        return "Frontend test!";
    }

}
