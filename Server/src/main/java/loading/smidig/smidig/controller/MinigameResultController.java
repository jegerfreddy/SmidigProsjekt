package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.MinigameResult;
import loading.smidig.smidig.service.MinigameResultService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/minigameResult")
@CrossOrigin(origins = "http://172.20.10.2:5173")
public class MinigameResultController {
    private final MinigameResultService minigameResultService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public MinigameResultController(MinigameResultService minigameResultService) {
        this.minigameResultService = minigameResultService;
    }

    //Get all minigame results
    @GetMapping("/all")
    public List<MinigameResult> getMinigameResults() {
        return minigameResultService.getMinigameResults();
    }

    //Get minigame result by ID
    @GetMapping("/id/{id}")
    public MinigameResult getMinigameResultById(@PathVariable Long id) {
        logger.info("Fetching minigame result by ID: " + id);
        return minigameResultService.getMinigameResultById(id);
    }

    //Create new minigame result
    @PostMapping("/new")
    public MinigameResult createMinigameResult(@RequestBody MinigameResult minigameResult) {
        logger.info("Minigame result created for user: " + minigameResult.getUser().getUsername());
        return minigameResultService.createMinigameResult(minigameResult);
    }

    //Delete minigame result
    @DeleteMapping("/delete/{id}")
    public void deleteMinigameResult(@PathVariable Long id) {
        logger.info("Minigame result deleted: " + id);
        minigameResultService.deleteMinigameResult(id);
    }

    //Update minigame result
    @PutMapping("/update")
    public MinigameResult updateMinigameResult(@RequestBody MinigameResult minigameResult) {
        logger.info("Minigame result updated for user: " + minigameResult.getUser().getUsername());
        return minigameResultService.updateMinigameResult(minigameResult);
    }
}
