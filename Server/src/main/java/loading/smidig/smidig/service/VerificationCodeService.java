package loading.smidig.smidig.service;

import loading.smidig.smidig.model.User;
import loading.smidig.smidig.model.VerificationCode;
import loading.smidig.smidig.repository.UserRepository;
import loading.smidig.smidig.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Service
public class VerificationCodeService {
    private final VerificationCodeRepository verificationCodeRepository;
    private final UserRepository userRepository;

    @Autowired
    public VerificationCodeService(VerificationCodeRepository verificationCodeRepository, UserRepository userRepository) {
        this.verificationCodeRepository = verificationCodeRepository;
        this.userRepository = userRepository;
    }

    public List<VerificationCode> generateCodes(int amount) {
        List<VerificationCode> codes = new ArrayList<>();
        Random random = new Random();
        Set<String> existingCodes = new HashSet<>(verificationCodeRepository.findAll().stream().map(VerificationCode::getCode).toList());

        while (codes.size() < amount) {
            StringBuilder code = new StringBuilder();
            for (int j = 0; j < 6; j++) {
                int charType = random.nextInt(3);
                switch (charType) {
                    case 0:
                        code.append(random.nextInt(10));
                        break;
                    case 1:
                        code.append((char) ('A' + random.nextInt(26)));
                        break;
                    case 2:
                        code.append((char) ('a' + random.nextInt(26)));
                        break;
                }
            }
            String generatedCode = code.toString();
            if (!existingCodes.contains(generatedCode)) {
                VerificationCode tmp = new VerificationCode(generatedCode);
                codes.add(tmp);
                existingCodes.add(generatedCode);
            }
        }

        return verificationCodeRepository.saveAll(codes);
    }

    public boolean verifyUser(Long userID, String code) {
        VerificationCode verificationCode = getVerificationCodeByCode(code);
        User user = userRepository.findById(userID).orElse(null);

        if(verificationCode.getUsed() == 0){
            verificationCode.setUsed(1);
            user.setVerified(1);
            verificationCodeRepository.save(verificationCode);
            return true;
        }

        return false;
    }

    public VerificationCode getVerificationCodeByCode(String code) {
        List<VerificationCode> codes = verificationCodeRepository.findAll();
        for (VerificationCode verificationCode : codes) {
            if (verificationCode.getCode().equals(code)) {
                return verificationCode;
            }
        }
        return null;
    }
}
