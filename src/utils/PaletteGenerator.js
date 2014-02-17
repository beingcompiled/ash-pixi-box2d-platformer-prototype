 define([

    'utils/Point',
    'utils/MathUtils',
    'utils/DrawUtils'

],
    function(

        Point, 
        MathUtils,
        DrawUtils
    
    ) {

        "use strict";

        var paletteIDs = ["night", "twilight", "winter", "natural"];

        var palettes = {
            night: [ 
                "0x222222", "0x333333", "0x001848", "0x002745", "0x252326", "0x262625", "0x0D0D0C"
                , "0x222222", "0x333333", "0x001848", "0x002745", "0x252326", "0x262625", "0x0D0D0C"
                , "0x010101", "0x17181D", "0x3A332D", "0x3F505A"
                , "0x301860", "0x483078", "0x604878", "0x906090"
                , "0x040001", "0x3B2F31", "0x6F545D", "0x8879A4"
                , "0x000706", "0x00272D", "0x134647"
                , "0x030C22", "0x20293F", "0x404749"
                , "0x5E0C29", "0x52253A", "0x473D4A", "0x3B565B"
            ],
            twilight: [ 
                "0x000000", "0x111111", "0x222222", "0x333333", "0x001848",
                "0x0D2321", "0x0B464C", "0x16816D", "0x15C585", "0xC3FFD4",
                "0x1C1317", "0x634D58", "0xBF6869", "0xFA8E71", "0xCAC695",
                "0x100218", "0x020729", "0x030D4F", "0xEEEAF2"
            ],
            winter: [
                "0xffffff", "0xE6E8E3", "0xD7DACF", "0xBEC3BC", "0x8F9A9C", "0x65727A",
                "0xFEF7FE", "0xC2C5CE", "0x85858D", "0xA29494", "0x635353",
                "0xAEEBD7", "0xD8E8D3", "0xF7F1E1",
                "0x5F5542", "0x727557", "0xFBF2E1", "0x3D2C1B", "0x97A385"
            ],
            natural: [
                "0x78684E", "0xDDDABE", "0xECEAD9", "0x98A349", "0x798616", "0x042608", 
                "0x2A5C0B", "0x808F12", "0xFAEDD9", "0xEA2A15",
                "0x9BA657", "0xF0E5C9", "0xA68C69", "0x594433",
                "0x698C52", "0x8D6B2B", "0x873A20", "0x3D0A19", "0x172214", "0x44522F", 
                "0x718351", "0x9AAB9B",
                "0x5F5542", "0x727557", "0xFBF2E1", "0x3D2C1B", "0x97A385"
            ],
            sunset: [
               "0x324152", "0x47535E", "0x796466", "0xC1836A", "0xDEA677", "0x56676E", "0x7A9686", "0xB1C999", "0xE8E2B2", "0xD95F42"
            ]
        }

        return {

            getRandom : function() {
                return paletteIDs[_.random(0, paletteIDs.length-1)]
            },

            generate : function(style, chanceRandom) {

                var palette = {
                    id: style,
                    colors: [],
                    getRandom: function(collection) {
                        return collection[_.random(0, collection.length-1)];
                    }
                }

                palette.colors = palettes[style];

                // for (var i=0; i<chanceRandom*10; i++) {
                //     palette.colors.push(MathUtils.rdmColor());
                // }

                return(palette);
            }
        };
    }
);