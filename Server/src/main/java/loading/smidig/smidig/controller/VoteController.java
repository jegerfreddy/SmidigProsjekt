package loading.smidig.smidig.controller;

import loading.smidig.smidig.model.Vote;
import loading.smidig.smidig.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vote")
@CrossOrigin(origins = "http://localhost:5173")
public class VoteController {

    private final VoteService voteService;

    @Autowired
    public VoteController(VoteService voteService) {
        this.voteService = voteService;
    }

    @GetMapping("/all")
    public List<Vote> getAllVotes() {
        return voteService.getVotes();
    }

    @GetMapping("/id/{id}")
    public Vote getVotesById(@PathVariable Long id) {
        return voteService.getVoteById(id);
    }

    @PostMapping("/new")
    public Vote createVote(@RequestBody Vote vote) {
        return voteService.createVote(vote);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteVoteById(@PathVariable Long id){
        voteService.deleteVoidById(id);
    }

    @PutMapping("/update")
    public Vote updateVote(@RequestBody Vote vote) {
        return voteService.updateVote(vote);
    }


}
