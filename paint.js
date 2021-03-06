/**
 * Created by mongolrgata on 14.01.2015.
 */

;
(function () {
    class WsDebugHelpers {
        /**
         * TODO описание
         * @param $node
         * @returns {number}
         */
        maxZIndex($node) {
            // TODO
            return 100500;
        }

        /**
         * TODO описание
         */
        showReadyMessage() {
            $(document).ready(function () {
                var
                    $body = $('body'),
                    $divMessageBox = $('<div/>').css({
                        position: 'fixed',
                        top: '16px',
                        left: '16px',
                        padding: '16px',
                        zIndex: maxZIndex($body) + 1,
                        font: 'normal normal normal 16px Segoe UI, sans-serif',
                        background: 'indigo',
                        boxShadow: '0 0 16px rgba(0,0,0,0.5)',
                        color: 'white'
                    }),
                    $a = $('<a target="_blank" href="https://github.com/mongolrgata/ws-debug-helpers/blob/master/README.md#%D0%94%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D0%BE">ШТА?</a>').css({
                        fontWeight: 'bold',
                        color: 'white'
                    });

                $body.append(
                    $divMessageBox.append(
                        'Свистелки и перделки загружены. ',
                        $a
                    )
                );

                $divMessageBox.hover(
                    function () {
                        $divMessageBox.stop(true).animate({opacity: 1}, 0);
                    },
                    function () {
                        $divMessageBox.stop(true).delay(800).animate({opacity: 0}, 1600, function () {
                            $divMessageBox.remove();
                        });
                    }
                ).trigger('mouseleave');
            });
        }
    }
})();
