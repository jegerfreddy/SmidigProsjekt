package loading.smidig.smidig.service;

import loading.smidig.smidig.model.Act;
import loading.smidig.smidig.model.ActEvent;
import loading.smidig.smidig.repository.ActEventRepository;
import loading.smidig.smidig.repository.ActRepository;
import loading.smidig.smidig.repository.VoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ActEventService {
    private final ActEventRepository actEventRepository;
    private final VoteRepository voteRepository;
    private final ActRepository actRepository;
    private final VoteService voteService;
    @Autowired
    public ActEventService(ActEventRepository actEventRepository, ActRepository actRepository, VoteRepository voteRepository, VoteService voteService) {
        this.actEventRepository = actEventRepository;
        this.actRepository = actRepository;
        this.voteRepository = voteRepository;
        this.voteService = voteService;
    }

    //Get all act events
    public List<ActEvent> getActEvents() {
        return actEventRepository.findAll();
    }

    //Get act event by ID
    public ActEvent getActEventById(Long id) {
        return actEventRepository.findById(id).orElse(null);
    }

    //Create act event
    public ActEvent createActEvent(ActEvent actEvent) {
        return actEventRepository.save(actEvent);
    }

    //Delete act event by ID
    public void deleteActEvent(Long id) {
        actEventRepository.deleteById(id);
    }

    //Update act event
    public ActEvent updateActEvent(ActEvent actEvent) {
        return actEventRepository.save(actEvent);
    }


    // Get all actEvents for a specific actID
    public List<ActEvent> getActEventsByActID(Long actID) {
        return actEventRepository.findAll()
                .stream()
                .filter(actEvent -> actEvent.getAct() != null && actEvent.getAct().getActID().equals(actID))
                .collect(Collectors.toList());
    }

    public ActEvent linkActEventToAct(Long actID, Long actEventID) {
        ActEvent actEvent = actEventRepository.findById(actEventID).orElse(null);

        if (actEvent != null) {
            Act act = actRepository.findById(actID).orElse(null);
            actEvent.setAct(act);
            return actEventRepository.save(actEvent);
        }
        return null;
    }

    public ActEvent getNextEvent(Long actEventID){
        ActEvent actEvent = actEventRepository.findById(actEventID).orElse(null);

        List<Integer> winners = voteService.getWinner(actEventID);
        if(winners.size() == 1){
            switch (winners.get(0)) {
                case 1:
                    return actEvent.getNextEventOption1();
                case 2:
                    return actEvent.getNextEventOption2();
                case 3:
                    return actEvent.getNextEventOption3();
                case 4:
                    return actEvent.getNextEventOption4();
                default:
                    return null;
            }
        }
        return null;
    }


    public ActEvent setNextEventByOption(Long actEventID, int option, Long nextEventID) {
        ActEvent actEvent = actEventRepository.findById(actEventID).orElse(null);
        ActEvent nextEvent = actEventRepository.findById(nextEventID).orElse(null);

        if (actEvent != null && nextEvent != null) {
            switch (option) {
                case 1:
                    actEvent.setNextEventOption1(nextEvent);
                    break;
                case 2:
                    actEvent.setNextEventOption2(nextEvent);
                    break;
                case 3:
                    actEvent.setNextEventOption3(nextEvent);
                    break;
                case 4:
                    actEvent.setNextEventOption4(nextEvent);
                    break;
            }
            return actEventRepository.save(actEvent);
        }

        return null;
    }

    public ActEvent getNextActEventByOption(Long actEventID, int option) {
        ActEvent actEvent = actEventRepository.findById(actEventID).orElse(null);

        if (actEvent != null) {
            switch (option) {
                case 1:
                    return actEvent.getNextEventOption1();
                case 2:
                    return actEvent.getNextEventOption2();
                case 3:
                    return actEvent.getNextEventOption3();
                case 4:
                    return actEvent.getNextEventOption4();
                default:
                    return null;
            }
        }
        return null;
    }
}
