# open-e-ID
Ziel ist das Erstellen eines Systems zur notarisierten Ausstellung, Präsentation und Überprüfung einer digitalen Identitätskarte. 

Komponenten:
- Autoritäten-Server und e-ID Verwaltungsservice (Betreiber)
- Pass-App (Endnutzer)
- Verifizierungsapp

"Damit werden medienbruchfreie Prozesse in der Verwaltung und bei Unternehmen möglich, welche heute auf Seiten der zu verifizierenden Personen wie auch auf Seite der Verwaltung und bei Unternehmen unnötige Aufwände verursachen." - Bundesamt für Justiz BJ

Das System soll dabei auch mit nur sporadisch aktualisierten/mit dem Internet verbundenen Geräten funktionieren, sich aber auf eine Zentrale Autorität verlassen. So können open-e-IDs mathematisch bewiesen sicher sein und auf produktionsgetesteten Kryptografischen Algorithmen aufbauen. Diese Autorität kann dabei e-ID ausstellen oder widerrufen. Ist eine e-ID erst einmal ausgestellt, bleibt diese unveränderbar für eine fixe Zeit gültig.

Open-e-IDs können als NFC-Tag, QR-Code oder als Mischform (wie z.B. Apple Wallet) vorgewiesen werden. Dabei werden die Standards CBOR Object Signing and Encryption (COSE) RFC 8152, 9052 und 9053 implementiert, um die Authentizität einer e-ID eindeutig festzustellen. Die Verifikationsapp lädt dazu bei der Installation eine Liste vertrauenswürdiger Organisationen (Aussteller) und die zugehörigen öffentlichen Schlüssel herunter, zukünftig werden die Signaturen zu verifizierender Ausweise gegen diese Ausstellerschlüssel gepasst. Passen die Signaturen, ist die e-ID gültig (Grüner Bildschirm wird angezeigt). Stimmt die Signatur jedoch nicht überein oder ein Aussteller hat den SHA-512-Hash des Zertifikats auf eine Blacklist gesetzt, wird die e-ID abgelehnt (Roter Bildschirm). Ist eine ungültige e-ID im eigenen Pass-App hinterlegt, wird der QR-Code dort nicht mehr angezeigt.


## Links / Literatur / Libs:
https://www.npmjs.com/package/cose-js

https://www.rfc-editor.org/rfc/rfc8152

https://www.rfc-editor.org/rfc/rfc9052

https://www.rfc-editor.org/rfc/rfc9053


