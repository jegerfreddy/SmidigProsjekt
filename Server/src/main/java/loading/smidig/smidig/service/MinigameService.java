package loading.smidig.smidig.service;

import loading.smidig.smidig.model.Minigame;
import loading.smidig.smidig.repository.MinigameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MinigameService {
    private final MinigameRepository minigameRepository;

    @Autowired
    public MinigameService(MinigameRepository minigameRepository) {
        this.minigameRepository = minigameRepository;
    }

    //Get all minigames
    public List<Minigame> getMinigames() {
        return minigameRepository.findAll();
    }

    //Get minigame by ID
    public Minigame getMinigameById(Long id) {
        return minigameRepository.findById(id).orElse(null);
    }

    //Create minigame
    public Minigame createMinigame(Minigame minigame) {
        return minigameRepository.save(minigame);
    }

    //Delete minigame by ID
    public void deleteMinigame(Long id) {
        minigameRepository.deleteById(id);
    }

    //Update minigame
    public Minigame updateMinigame(Minigame minigame) {
        return minigameRepository.save(minigame);
    }
}
