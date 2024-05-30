package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.VerificationCode;
import loading.smidig.smidig.service.VerificationCodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/verify")
@CrossOrigin(origins = "http://localhost:5173")
public class VerificationCodeController {
    private final VerificationCodeService verificationCodeService;

    @Autowired
    public VerificationCodeController(VerificationCodeService verificationCodeService) {
        this.verificationCodeService = verificationCodeService;
    }

    //Generate X amount of codes
    @GetMapping("/generate/{amount}")
    public List<VerificationCode> generateCodes(@PathVariable int amount) {
        return verificationCodeService.generateCodes(amount);
    }

    //Verify a user with a code
    @PostMapping("/{userID}/{code}")
    public boolean verifyUser(@PathVariable Long userID, @PathVariable String code) {
        return verificationCodeService.verifyUser(userID, code);
    }
}
