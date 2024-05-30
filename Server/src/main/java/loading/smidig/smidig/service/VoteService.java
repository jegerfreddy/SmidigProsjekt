package loading.smidig.smidig.service;

import loading.smidig.smidig.model.Vote;
import loading.smidig.smidig.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoteService {

    private final VoteRepository voteRepository;

    @Autowired
    public VoteService(VoteRepository voteRepository) {
        this.voteRepository = voteRepository;
    }

    public List<Vote> getVotes() {
        return voteRepository.findAll();
    }

    public Vote getVoteById(Long id) {
        return voteRepository.findById(id).orElse(null);
    }

    public Vote createVote(Vote vote) {
        return voteRepository.save(vote);
    }

    public void deleteVoidById(Long id){
        voteRepository.deleteById(id);
    }

    public Vote updateVote(Vote vote) {
        return voteRepository.save(vote);
    }

}
