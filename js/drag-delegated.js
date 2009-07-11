/**
 * HTML5 Drag & Drop with Event Delegation
 *
 * <div id="delegated">
 *     <h2>New school drag and drop, now with Event Delegation!</h2>
 *     <ul class="drag_delegates">
 *         <li class="dragme" id="drag0" draggable="true">Drag 0</li>
 *         <li class="dragme" id="drag1" draggable="true">Drag 1</li>
 *         <li class="dragme" id="drag2" draggable="true">Drag 2</li>
 *         <li><a href="#" class="spawn">+ Add another</a></li>
 *     </ul>
 *     <ul class="drop_delegates">
 *         <li class="drophere" id="drop0">Drop 0</li>
 *         <li class="drophere" id="drop1">Drop 1</li>
 *         <li class="drophere" id="drop2">Drop 2</li>
 *         <li><a href="#" class="spawn">+ Add another</a></li>
 *     </ul>
 *     <p><a href="js/drag-delegated.js" target="_blank">View JS Source</a></p>
 * </div>
 */
$(document).ready(function() {

    // Set up the draggable element.
    $('#delegated .drag_delegates')
        .bind('dragstart', function(ev) {
            if (!$(ev.target).hasClass('dragme')) return true;

            var dt = ev.originalEvent.dataTransfer;
            dt.setData("Text", "Dropped " + ev.target.id);
            return true;
        });

    // Set up the drop zone.
    $('#delegated .drop_delegates')

        // Update the drop zone class on drag enter/leave
        .bind('dragenter', function(ev) {
            if (!$(ev.target).hasClass('drophere')) return true;

            $(ev.target).addClass('dragover');
            return false;
        })
        .bind('dragleave', function(ev) {
            if (!$(ev.target).hasClass('drophere')) return true;

            $(ev.target).removeClass('dragover');
            return false;
        })

        // Allow drops of any kind into the zone.
        .bind('dragover', function(ev) {
            if (!$(ev.target).hasClass('drophere')) return true;
            return false;
        })

        // Handle the final drop...
        .bind('drop', function(ev) {
            if (!$(ev.target).hasClass('drophere')) return true;

            var dt = ev.originalEvent.dataTransfer;
            $.log('#delegated .messages', 
                dt.getData("Text") + ' onto ' + ev.target.id);
            ev.stopPropagation();
            return false;
        });

    // Wire up the factory links for draggables and drop zones.
    $.each(['drag_delegates', 'drop_delegates'], function() {

        var root = $('#delegated .' + this);
        root.data('last_spawn_id', root.find('li').length - 2);

        root.find('a.spawn').click(function(ev) {
        
            // Clone the first one in the list as a template.
            var new_li = root.find('li:first').clone();

            // Come up with a new ID for the item.
            var new_id = root.data('last_spawn_id') + 1;
            root.data('last_spawn_id', new_id);

            // Replace "0" in the ID and text with the new ID
            new_li.text(new_li.text().replace('0', new_id) );
            new_li.attr('id',  new_li.attr('id').replace('0', new_id) );

            // Toss the new item in before the spawn link.
            new_li.insertBefore(ev.target.parentNode);

            return false;

        });

    });

});
