package loading.smidig.smidig.service;

import loading.smidig.smidig.model.MinigameResult;
import loading.smidig.smidig.repository.MinigameResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MinigameResultService {

    private final MinigameResultRepository minigameResultRepository;

    @Autowired
    public MinigameResultService(MinigameResultRepository minigameResultRepository) {
        this.minigameResultRepository = minigameResultRepository;
    }

    //Get all minigame results
    public List<MinigameResult> getMinigameResults() {
        return minigameResultRepository.findAll();
    }

    //Get minigame result by ID
    public MinigameResult getMinigameResultById(Long id) {
        return minigameResultRepository.findById(id).orElse(null);
    }

    //Create minigame result
    public MinigameResult createMinigameResult(MinigameResult minigameResult) {
        return minigameResultRepository.save(minigameResult);
    }

    //Delete minigame result by ID
    public void deleteMinigameResult(Long id) {
        minigameResultRepository.deleteById(id);
    }

    //Update minigame result
    public MinigameResult updateMinigameResult(MinigameResult minigameResult) {
        return minigameResultRepository.save(minigameResult);
    }
}
