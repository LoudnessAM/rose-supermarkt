from django.contrib.admin.sites import AdminSite

# Überschreibe die standard AdminSite-Klasse mit einer angepassten Version
class HelpfulAdminSite(AdminSite):
    def each_context(self, request):
        context = super().each_context(request)
        context['help_text'] = {
            'products': """
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    <h4>Hilfe zur Produktverwaltung</h4>
                    <p>Hier können Sie alle Produkte verwalten, die im Online-Shop angezeigt werden.</p>
                    <ul>
                        <li><strong>Name:</strong> Der Name des Produkts, wie er im Shop angezeigt wird.</li>
                        <li><strong>Beschreibung:</strong> Detaillierte Informationen über das Produkt.</li>
                        <li><strong>Preis:</strong> Der Verkaufspreis (in Euro).</li>
                        <li><strong>Kategorie:</strong> Die Produktkategorie für die Filterung.</li>
                        <li><strong>Lagerbestand:</strong> Die aktuelle Anzahl der verfügbaren Produkte.</li>
                        <li><strong>Bild:</strong> Ein Foto des Produkts (idealerweise quadratisch).</li>
                    </ul>
                </div>
            """,
            'categories': """
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    <h4>Hilfe zur Kategorieverwaltung</h4>
                    <p>Hier können Sie Produktkategorien erstellen und verwalten.</p>
                    <p>Kategorien helfen Kunden, Produkte leichter zu finden.</p>
                </div>
            """,
            'specialoffers': """
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    <h4>Hilfe zur Angebotsverwaltung</h4>
                    <p>Hier können Sie spezielle Angebote erstellen, die auf der Startseite angezeigt werden.</p>
                    <ul>
                        <li><strong>Titel:</strong> Der Titel des Angebots.</li>
                        <li><strong>Beschreibung:</strong> Details zum Angebot.</li>
                        <li><strong>Aktiv:</strong> Wenn aktiviert, wird das Angebot auf der Startseite angezeigt.</li>
                        <li><strong>Bild:</strong> Ein Foto für das Angebot (idealerweise im Format 4:3 oder 16:9).</li>
                    </ul>
                </div>
            """,
        }
        return context