package com.example.InternalManagementSystem.Entity;


import jakarta.persistence.*;


import java.util.List;

@Entity
@Table(name = "ims_groups")
public class Groups {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int groupId;

    private String Name;
    private String description;


    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    private List<Clients> clients;

    public int getGroupId() {
        return groupId;
    }

    public void setGroupId(int groupId) {
        this.groupId = groupId;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Clients> getClients() {
        return clients;
    }

    public void setClients(List<Clients> clients) {
        this.clients = clients;
    }



    @Override
    public String toString() {
        return "Groups{" +
                "groupId=" + groupId +
                ", Name='" + Name + '\'' +
                ", description='" + description + '\'' +
                ", clients=" + clients +
                '}';
    }
}
