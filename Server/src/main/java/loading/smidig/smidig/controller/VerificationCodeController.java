package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.VerificationCode;
import loading.smidig.smidig.service.VerificationCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/verify")
@CrossOrigin(origins = "http://localhost:5173")
public class VerificationCodeController {
    private final VerificationCodeService verificationCodeService;

    //Logger
    private static final Logger logger = LoggerFactory.getLogger(VerificationCodeController.class);

    @Autowired
    public VerificationCodeController(VerificationCodeService verificationCodeService) {
        this.verificationCodeService = verificationCodeService;
    }

    //Generate X amount of codes
    @GetMapping("/generate/{amount}")
    public List<VerificationCode> generateCodes(@PathVariable int amount) {
        logger.info("Generating " + amount + " codes");
        return verificationCodeService.generateCodes(amount);
    }

    //Verify a user with a code
    @PostMapping("/{userID}/{code}")
    public boolean verifyUser(@PathVariable Long userID, @PathVariable String code) {
        logger.info("Verifying user with ID: " + userID + " and code: " + code);
        return verificationCodeService.verifyUser(userID, code);
    }

    //Validate if code is valid
    @GetMapping("/validate/{code}")
    public boolean validateCode(@PathVariable String code) {
        logger.info("Validating code: " + code);
        return verificationCodeService.validateCode(code);
    }
}
