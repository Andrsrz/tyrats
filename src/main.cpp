/*! \file */

/* TYRA by Andres Ruiz */

#include <iostream>
#include "../include/Owner.hpp"
#include "../include/Client.hpp"
#include <gtkmm/application.h>
#include "../include/helloworld.hpp"

int main(int argc, char *argv[]){
    auto app = Gtk::Application::create(argc, argv, "example");

    HelloWorld helloworld;

    Owner me = Owner("andres", "ruiz", "male", "andres@mail.com", "micasa #90", "93405900");

    // std::cout << me.getName() << "\n";
    // std::cout << me.getLastName() << "\n";
    // std::cout << me.getGender() << "\n";
    // std::cout << me.getEmail() << "\n";
    // std::cout << me.getAddress() << "\n";
    // std::cout << me.getPhoneNumber() << "\n";

    Pet coque = Pet();
    Client meAgain = Client(me, coque);

    std::cout << meAgain.getOwner().getName() << "\n";
    std::cout << meAgain.getPet().getBreed() << "\n";


    return app->run(helloworld);
}
