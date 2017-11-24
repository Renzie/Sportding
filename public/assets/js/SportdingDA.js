/*
 SportdingDA.validateUser("gebruikersnaam", "wachtwoord")
 .then(function (gebuikersinfo) {
 (doe iets met de info)
 })
 .catch(function (fout) {
 console.log(fout)
 }
 */


var SportdingDA = (function () {

    this.createPerson = function(username, password, age) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                method: "GET",
                url: "/gebruikers?gebruikersnaam=" + username
            }).then(function(result) {
                if (result.length > 0) {
                    reject("Gebruiker bestaat al.");
                    return;
                }

                $.ajax({
                    method: "POST",
                    url: "/gebruikers",
                    contentType: "application/json",
                    data: JSON.stringify({
                        gebruikersnaam: username,
                        wachtwoord: password,
                        isOrganisatie: false
                    })
                }).then(function(newUser) {
                    $.ajax({
                        method: "POST",
                        url: "/persoons",
                        contentType: "application/json",
                        data: JSON.stringify({
                            gebruikerId: newUser.id,
                            leeftijd: age
                        })
                    }).then(function(result) {
                        resolve(true);
                    });
                });
            });
        });
    };

    this.createOrganisation = function(username, password, name) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                method: "GET",
                url: "/gebruikers?gebruikersnaam=" + username
            }).then(function(result) {
                if (result.length > 0) {
                    reject("Gebruiker bestaat al.");
                    return;
                }

                $.ajax({
                    method: "POST",
                    url: "/gebruikers",
                    contentType: "application/json",
                    data: JSON.stringify({
                        gebruikersnaam: username,
                        wachtwoord: password,
                        isOrganisatie: true
                    })
                }).then(function(newUser) {
                    $.ajax({
                        method: "POST",
                        url: "/organisaties",
                        contentType: "application/json",
                        data: JSON.stringify({
                            gebruikerId: newUser.id,
                            naam: name
                        })
                    }).then(function(result) {
                        resolve(true);
                    });
                });
            });
        });
    };

    this.validateUser = function (username, password) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                method: "GET",
                url: "/gebruikers",
                data: {
                    gebruikersnaam: username,
                    wachtwoord: password
                }
            }).then(function (result) {
                if (result.length === 0) {
                    reject("Verkeerd gebruikersnaam of wachtwoord.");
                    return;
                }

                var user = result[0];
                delete user["wachtwoord"];

                if (user.isOrganisatie) {
                    $.ajax({
                        method: "GET",
                        url: "/organisaties?gebruikerId=" + user.id
                    }).then(function (organisatie) {
                        user.organisatie = organisatie[0];

                        $.ajax({
                            method: "GET",
                            url: "/organisaties/" + user.organisatie.id + "/organisaties-sports?_expand=sport"
                        }).then(function (result) {
                            user.sports = result;
                            resolve(user);
                        });
                    });
                } else {
                    $.ajax({
                        method: "GET",
                        url: "/persoons?gebruikerId=" + user.id
                    }).then(function (persoon) {
                        user.persoon = persoon[0];

                        $.ajax({
                            method: "GET",
                            url: "/persoons/" + user.persoon.id + "/persoons-sports?_expand=sport"
                        }).then(function (result) {
                            user.sports = result;
                            resolve(user);
                        });
                    });
                }
            });
        });
    };

    //Public members
    return {
        createPerson: this.createPerson,
        createOrganisation: this.createOrganisation,
        validateUser: this.validateUser
    }
})
();